import { neon } from '@neondatabase/serverless';
import { users } from '../database/schema';
import { put, del } from '@vercel/blob';
import { eq } from 'drizzle-orm';
import { customAlphabet } from 'nanoid';

export default defineEventHandler(async (event) => {
    const db = useDrizzle();

    const formData = await readFormData(event);

    const user = await db.query.users.findFirst({
        where: eq(users.email, formData.get('email') as string),
    });

    if (user) {
        throw createError({
            statusCode: 409,
            message: 'User already exists.',
        });
    }

    const hashedPassword = await hashPassword(
        formData.get('password') as string
    );
    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);
    const avatarId = nanoid();
    const { url } = await put(
        `avatars/${avatarId}`,
        formData.get('avatar') as File,
        {
            access: 'public',
        }
    );
    const sql = neon(process.env.DATABASE_URL!);

    await db
        .insert(users)
        .values({
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            avatar: url,
            createdAt: new Date(),
            password: hashedPassword,
        })
        .catch(async (error) => {
            await del(`avatars/${avatarId}`);
            throw createError({
                statusCode: 500,
                message: `${error.message}`,
            });
        });

    await setUserSession(event, {
        user: {
            email: formData.get('email'),
        },
        loggedInAt: Date.now(),
    });

    return setResponseStatus(event, 201);
});

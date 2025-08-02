import { z } from 'zod';
import { useDrizzle } from '../utils/drizzle';
import { users } from '../database/schema';
import { eq } from 'drizzle-orm';

interface User {
    id: number;
    email: string;
    password: string;
}

const invalidCredentialsError = createError({
    statusCode: 401,
    message: 'Invalid credentials.',
});

export default defineEventHandler(async (event) => {
    const db = useDrizzle();
    const { email, password } = await readValidatedBody(
        event,
        loginSchema.parse
    );

    const user = await db.query.users.findFirst({
        where: eq(users.email, email),
    });

    if (!user) {
        throw invalidCredentialsError;
    }

    if (!(await verifyPassword(user.password, password))) {
        throw invalidCredentialsError;
    }

    await setUserSession(event, { user: { email }, loggedInAt: new Date() });

    return setResponseStatus(event, 201);
});

import { eq } from 'drizzle-orm';
import { solves, solveSessions } from '~~/server/database/schema';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { sessionId, sessionName, time, status, scramble } = body;
    const db = useDrizzle();
    if (!sessionId || !time) {
        throw createError({
            statusCode: 400,
            statusMessage: 'Session ID and time are required',
        });
    }
    const existingSession = await db
        .select()
        .from(solveSessions)
        .where(eq(solveSessions.id, sessionId))
        .limit(1);

    const auth = event.context.auth();

    if (existingSession.length === 0) {
        await db.insert(solveSessions).values({
            id: sessionId,
            name: sessionName,
            userId: auth.userId,
        });
    }

    try {
        await db.insert(solves).values({
            id: Math.floor(Math.random() * 1000),
            time,
            sessionId,
            status,
            scramble: scramble.value,
            createdAt: new Date(),
        });
    } catch (error) {
        console.error('Error inserting solve:', error);
        throw createError({
            statusCode: 500,
            statusMessage: 'Internal Server Error',
        });
    }
});

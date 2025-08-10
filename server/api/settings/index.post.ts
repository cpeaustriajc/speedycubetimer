import { eq } from 'drizzle-orm';
import { preferences as preferencesTable } from '~~/server/database/schema';

export default defineEventHandler(async (event) => {
    const db = useDrizzle();
    const auth = event.context.auth?.();
    const isPro = Boolean(event.context.has?.({ plan: 'pro' }));
    if (!auth?.userId || !isPro) {
        throw createError({ statusCode: 403, statusMessage: 'Pro plan required' });
    }
    const body = await readBody(event);
    const {
        showInspectionTime,
        inspectionTimeDuration,
        autoStartOnInspectionTimeUp,
        clockPrecision,
        waitTime,
        hideUiDuringSolve,
    } = body;

    const preferences = await db.query.preferences.findFirst({
        where: (p) => eq(p.userId, auth.userId),
    });

    if (preferences) {
        await db
            .update(preferencesTable)
            .set({
                showInspectionTime,
                inspectionTimeDuration,
                autoStartOnInspectionTimeUp,
                clockPrecision,
                waitTime,
                hideUiDuringSolve,
            })
            .where(eq(preferencesTable.userId, auth.userId))
            .execute();
    } else {
        await db
            .insert(preferencesTable)
            .values({
                userId: auth.userId,
                showInspectionTime,
                inspectionTimeDuration,
                autoStartOnInspectionTimeUp,
                clockPrecision,
                waitTime,
                hideUiDuringSolve,
            })
            .execute();
    }

    return { success: true };
});

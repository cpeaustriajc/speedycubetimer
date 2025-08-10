import { and, eq } from 'drizzle-orm';

export default defineEventHandler(async (event) => {
    const db = useDrizzle();

    const preferences = await db.query.preferences.findFirst({
        where: (p) => and(eq(p.userId, event.context.auth.userId)),
    });

    if (!preferences) {
        return {
            showInspectionTime: false,
            inspectionTimeDuration: 15,
            autoStartOnInspectionTimeUp: false,
            clockPrecision: 2,
            waitTime: 200,
            hideUiDuringSolve: false,
        };
    }

    return {
        showInspectionTime: preferences.showInspectionTime,
        inspectionTimeDuration: preferences.inspectionTimeDuration,
        autoStartOnInspectionTimeUp: preferences.autoStartOnInspectionTimeUp,
        clockPrecision: preferences.clockPrecision,
        waitTime: preferences.waitTime,
        hideUiDuringSolve: preferences.hideUiDuringSolve,
    };
});

import { relations } from 'drizzle-orm';
import {
    pgTable,
    text,
    integer,
    timestamp,
    index,
    pgEnum,
    doublePrecision,
    boolean,
} from 'drizzle-orm/pg-core';

export const solveType = pgEnum('solve_type', ['solved', 'dnf', '+2']);

export const solveSessions = pgTable('solve_sessions', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(),
    name: text('name').notNull(),
    eventType: text('event_type').notNull().default('333'),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
});

export const sessionRelations = relations(solveSessions, ({ many }) => ({
    solves: many(solves),
}));

export const solves = pgTable(
    'solves',
    {
        id: integer('id').primaryKey(),
        sessionId: text('session_id')
            .notNull()
            .references(() => solveSessions.id),
        time: doublePrecision('time').notNull(),
        status: solveType('status').notNull().default('solved'),
        scramble: text('scramble'),
        createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    },
    (t) => [index('idx_session_id').on(t.sessionId)]
);

export const solveRelations = relations(solves, ({ one }) => ({
    session: one(solveSessions, {
        fields: [solves.sessionId],
        references: [solveSessions.id],
    }),
}));

export const preferences = pgTable(
    'preferences',
    {
        userId: text('user_id').primaryKey(),
        showInspectionTime: boolean('show_inspection_time').default(false),
        inspectionTimeDuration: integer('inspection_time_duration').default(15),
        autoStartOnInspectionTimeUp: boolean(
            'auto_start_on_inspection_time_up'
        ).default(false),
        clockPrecision: integer('clock_precision').default(2),
        waitTime: integer('wait_time').default(200),
        hideUiDuringSolve: boolean('hide_ui_during_solve').default(false),
    },
    (t) => [index('idx_user_id').on(t.userId)]
);

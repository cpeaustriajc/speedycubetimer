import { relations } from 'drizzle-orm';
import {
    pgTable,
    text,
    integer,
    timestamp,
    index,
    pgEnum,
    doublePrecision,
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

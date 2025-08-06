import { relations } from 'drizzle-orm';
import { pgTable, text, integer, timestamp, index, pgEnum } from 'drizzle-orm/pg-core';

export const solveSessions = pgTable('solve_sessions', {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(),
    number: integer('number').notNull(),
    createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),

});

export const sessionRelations = relations(solveSessions, ({ many }) => ({
    solves: many(solves),
}));

export const solveType = pgEnum('solve_type', ['normal', 'dnf', 'dns', 'plusTwo']);

export const solves = pgTable(
    'solves',
    {
        id: integer('id').primaryKey(),
        sessionId: text('session_id').notNull(),
        time: integer('time').notNull(),
        status: text('status').notNull(),
        createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
    },
    (t) => [index('session_id').on(t.id)]
);

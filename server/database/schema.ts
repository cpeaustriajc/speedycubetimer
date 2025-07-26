import { pgTable, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text('password').notNull(),
    avatar: text('avatar'),
    createdAt: timestamp('created_at').notNull(),
});

export const credentials = pgTable('credentials', {
    userId: integer('userId')
        .notNull()
        .references(() => users.id, {
            onDelete: 'cascade',
            onUpdate: 'cascade',
        }),
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    publicKey: text('publicKey').notNull(),
    counter: integer('counter').notNull(),
    backedUp: integer('backedUp').notNull(),
    transports: text('transports').notNull(),
});

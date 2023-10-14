import {
  varchar,
  text,
  boolean,
  timestamp,
  serial,
  pgTable,
} from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

import { getDocuments } from '@/lib/api/documents/queries';

import { users } from './auth';

export const documents = pgTable('documents', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  url: text('url'),
  active: boolean('active').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  userId: varchar('user_id', { length: 256 })
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
});

// Schema for documents - used to validate API requests
export const insertDocumentSchema = createInsertSchema(documents).extend({
  title: z.string().min(1).max(256),
});

export const insertDocumentParams = createSelectSchema(documents, {
  active: z.coerce.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
}).omit({
  id: true,
  userId: true,
});

export const updateDocumentSchema = createSelectSchema(documents).extend({
  title: z.string().min(1).max(256),
});

export const updateDocumentParams = createSelectSchema(documents, {
  active: z.coerce.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
}).omit({
  userId: true,
});

export const documentIdSchema = updateDocumentSchema.pick({ id: true });

// Types for documents - used to type API request params and within Components
export type Document = z.infer<typeof insertDocumentSchema>;
export type NewDocument = z.infer<typeof insertDocumentSchema>;
export type NewDocumentParams = z.infer<typeof insertDocumentParams>;
export type UpdateDocumentParams = z.infer<typeof updateDocumentParams>;
export type DocumentId = z.infer<typeof documentIdSchema>['id'];

// this type infers the return from getDocuments() - meaning it will include any joins
export type CompleteDocument = Awaited<
  ReturnType<typeof getDocuments>
>['documents'][number];

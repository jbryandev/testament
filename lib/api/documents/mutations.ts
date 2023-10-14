import { and, eq } from 'drizzle-orm';

import { getUserAuth } from '@/lib/auth/utils';
import { db } from '@/lib/db';
import {
  DocumentId,
  NewDocumentParams,
  UpdateDocumentParams,
  updateDocumentSchema,
  insertDocumentSchema,
  documents,
  documentIdSchema,
} from '@/lib/db/schema/documents';

export const createDocument = async (document: NewDocumentParams) => {
  const { session } = await getUserAuth();
  const newDocument = insertDocumentSchema.parse({
    ...document,
    userId: session?.user.id!,
  });
  try {
    const [d] = await db.insert(documents).values(newDocument).returning();
    return { document: d };
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    return { error: message };
  }
};

export const updateDocument = async (
  id: DocumentId,
  document: UpdateDocumentParams,
) => {
  const { session } = await getUserAuth();
  const { id: documentId } = documentIdSchema.parse({ id });
  const newDocument = updateDocumentSchema.parse({
    ...document,
    userId: session?.user.id!,
  });
  try {
    const [d] = await db
      .update(documents)
      .set(newDocument)
      .where(
        and(
          eq(documents.id, documentId!),
          eq(documents.userId, session?.user.id!),
        ),
      )
      .returning();
    return { document: d };
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    return { error: message };
  }
};

export const deleteDocument = async (id: DocumentId) => {
  const { session } = await getUserAuth();
  const { id: documentId } = documentIdSchema.parse({ id });
  try {
    const [d] = await db
      .delete(documents)
      .where(
        and(
          eq(documents.id, documentId!),
          eq(documents.userId, session?.user.id!),
        ),
      )
      .returning();
    return { document: d };
  } catch (err) {
    const message = (err as Error).message ?? 'Error, please try again';
    console.error(message);
    return { error: message };
  }
};

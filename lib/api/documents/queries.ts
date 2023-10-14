import { eq, and } from 'drizzle-orm';

import { getUserAuth } from '@/lib/auth/utils';
import { db } from '@/lib/db';
import {
  type DocumentId,
  documentIdSchema,
  documents,
} from '@/lib/db/schema/documents';

export const getDocuments = async () => {
  const { session } = await getUserAuth();
  const d = await db
    .select()
    .from(documents)
    .where(eq(documents.userId, session?.user.id!));
  return { documents: d };
};

export const getDocumentById = async (id: DocumentId) => {
  const { session } = await getUserAuth();
  const { id: documentId } = documentIdSchema.parse({ id });
  const [d] = await db
    .select()
    .from(documents)
    .where(
      and(
        eq(documents.id, documentId),
        eq(documents.userId, session?.user.id!),
      ),
    );
  return { document: d };
};

import {
  createDocument,
  deleteDocument,
  updateDocument,
} from '@/lib/api/documents/mutations';
import { getDocumentById, getDocuments } from '@/lib/api/documents/queries';
import {
  documentIdSchema,
  insertDocumentParams,
  updateDocumentParams,
} from '@/lib/db/schema/documents';

import { publicProcedure, router } from '../trpc';

export const documentsRouter = router({
  getDocuments: publicProcedure.query(async () => {
    return getDocuments();
  }),
  getDocumentById: publicProcedure
    .input(documentIdSchema)
    .query(async ({ input }) => {
      return getDocumentById(input.id);
    }),
  createDocument: publicProcedure
    .input(insertDocumentParams)
    .mutation(async ({ input }) => {
      return createDocument(input);
    }),
  updateDocument: publicProcedure
    .input(updateDocumentParams)
    .mutation(async ({ input }) => {
      return updateDocument(input.id, input);
    }),
  deleteDocument: publicProcedure
    .input(documentIdSchema)
    .mutation(async ({ input }) => {
      return deleteDocument(input.id);
    }),
});

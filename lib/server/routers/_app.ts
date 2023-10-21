import { documentsRouter } from '@/lib/server/routers/documents';
import { emailRouter } from '@/lib/server/routers/email';
import { scriptureRouter } from '@/lib/server/routers/scripture';
import { usersRouter } from '@/lib/server/routers/users';
import { router } from '@/lib/server/trpc';

export const appRouter = router({
  documents: documentsRouter,
  users: usersRouter,
  email: emailRouter,
  scripture: scriptureRouter,
});

export type AppRouter = typeof appRouter;

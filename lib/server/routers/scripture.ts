import { getScripture } from '@/lib/api/scipture/queries';
import { scriptureParams } from '@/lib/api/scipture/schema';
import { publicProcedure, router } from '@/lib/server/trpc';

export const scriptureRouter = router({
  getScripture: publicProcedure
    .input(scriptureParams)
    .query(async ({ input }) => {
      return getScripture(input);
    }),
});

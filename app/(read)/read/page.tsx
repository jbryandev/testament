'use client';

import { useSearchParams } from 'next/navigation';

import { Icons } from '@/components/icons';
import ScriptureViewer from '@/components/scripture/viewer';
import { Button } from '@/components/ui/button';
import { trpc } from '@/lib/trpc/client';

export default function ReadPage() {
  const searchParams = useSearchParams();
  const passage = searchParams.get('p') || 'Genesis 1';
  const { data, isLoading, isError, isSuccess, refetch } =
    trpc.scripture.getScripture.useQuery({
      q: passage,
      'include-audio-link': false,
      'include-crossrefs': true,
    });

  const handleClick = () => {
    refetch();
  };

  return (
    <div className='container grid gap-12'>
      <div className='flex flex-col items-center'>
        {isLoading && <Icons.spinner className='h-6 w-6 animate-spin' />}
        {isError && (
          <>
            <p className='mb-6'>
              There was a problem retrieving the data. Please verify the search
              parameters.
            </p>
            <Button variant={'outline'} onClick={handleClick}>
              Try Again
            </Button>
          </>
        )}
        {isSuccess && data && <ScriptureViewer data={data} />}
      </div>
    </div>
  );
}

'use client';

import { Icons } from '@/components/icons';
import ScriptureViewer from '@/components/scripture/scripture-viewer';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { trpc } from '@/lib/trpc/client';

interface CrossrefProps {
  passage: string;
}

export default function Crossref({ passage }: CrossrefProps) {
  const utils = trpc.useContext();

  const { data, isLoading, isError, isSuccess, refetch } =
    trpc.scripture.getScripture.useQuery(
      {
        q: passage,
        'include-audio-link': false,
        'include-crossrefs': false,
        'include-passage-references': false,
        'include-book-titles': false,
        'include-chapter-numbers': false,
        'include-headings': false,
        'include-short-copyright': false,
        'include-footnotes': false,
      },
      {
        enabled: false,
      },
    );

  const handleClick = (event: any) => {
    refetch();
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          size={'sm'}
          onClick={handleClick}
          className=' font-normal'
        >
          {passage}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col space-y-2 p-4'>
        <h4 className='text-base font-semibold'>{passage}</h4>
        <hr />
        <div>
          {isLoading && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
          {isError && <span>Error retrieving passage. Please try again.</span>}
          {isSuccess && <ScriptureViewer data={data!} />}
        </div>
      </PopoverContent>
    </Popover>
  );
}

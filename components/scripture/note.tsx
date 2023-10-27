import { Icons } from '@/components/icons';
import Crossref from '@/components/scripture/crossref';
import { parseCrossReferences } from '@/components/scripture/utils';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

type NoteProps = {
  content: string;
} & (FootnoteProps | CrossrefProps);

type FootnoteProps = {
  type: 'footnote';
};

type CrossrefProps = {
  type: 'crossref';
  verse: string;
};

export default function Note(props: NoteProps) {
  const label = props.type === 'crossref' ? 'Cross Reference' : 'Footnote';
  let passages: string[] = [];

  if (props.type === 'crossref') {
    passages = parseCrossReferences(props.verse, props.content);
  }

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant={'ghost'}
          className={cn(
            props.type === 'footnote' && '-mr-1',
            props.type === 'crossref' && '-ml-1',
            'h-6 w-6 p-1.5',
          )}
        >
          {props.type === 'footnote' ? (
            <Icons.footnote className='h-full w-full text-muted-foreground' />
          ) : (
            <Icons.crossref className='h-full w-full text-muted-foreground' />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='flex flex-col space-y-2 bg-popover/80 p-4 backdrop-blur-sm'>
        <h4 className='text-base font-semibold'>{label}</h4>
        <hr />
        {props.type === 'footnote' ? (
          // Show footnote content
          <div
            className='text-base'
            dangerouslySetInnerHTML={{ __html: props.content }}
          />
        ) : (
          // Show cross reference content
          <div className='grid grid-cols-2 gap-2'>
            {passages &&
              passages.map((passage, index) => (
                <Crossref key={index} passage={passage} />
              ))}
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

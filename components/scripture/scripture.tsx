import * as HtmlToReact from 'html-to-react';

import Note from '@/components/scripture/note';
import { ScriptureResponse } from '@/lib/api/scipture/schema';

export default function Scripture({ data }: { data: ScriptureResponse }) {
  const scripture = parseScripture(data);
  return (
    <div className='flex flex-col items-center'>
      <div className='max-w-prose'>{scripture}</div>
    </div>
  );
}

export function parseScripture(data: ScriptureResponse) {
  // Join the scripture HTML received from the API
  const html = data.passages
    ?.join('')
    .trim()
    .replace(/&nbsp;/g, '');

  // Parse HTML to React
  const htmlToReactParser = HtmlToReact.Parser();

  // Create a custom function to validate nodes
  const isValidNode = () => {
    return true;
  };

  // Create a custom function to process nodes
  const processNodeDefinitions = HtmlToReact.ProcessNodeDefinitions();
  const processingInstructions = [
    {
      // Style <h2> tags
      shouldProcessNode: (node: any) => node.name === 'h2',
      processNode: (node: any, children: any, index: number) => {
        return (
          <h2 key={index} className='py-6 font-heading text-3xl md:text-4xl'>
            {children}
          </h2>
        );
      },
    },
    {
      // Style <h3> tags
      shouldProcessNode: (node: any) => node.name === 'h3',
      processNode: (node: any, children: any, index: number) => {
        return (
          <h3 key={index} className='pb-1 pt-6 text-xl font-semibold'>
            {children}
          </h3>
        );
      },
    },
    {
      // Format <p> tags to include a bottom margin for readability and indent for block quotes
      shouldProcessNode: (node: any) => node.name === 'p',
      processNode: (node: any, children: any, index: number) => {
        if (node.attribs.class && node.attribs.class.includes('block-indent')) {
          return (
            <p key={index} className='mx-6 mb-6'>
              {children}
            </p>
          );
        } else {
          return (
            <p key={index} className='mb-6'>
              {children}
            </p>
          );
        }
      },
    },
    {
      // Format <b> tags to improve verse and chapter number styling
      shouldProcessNode: (node: any) => node.name === 'b',
      processNode: (node: any, children: any, index: number) => {
        if (node.attribs.class.includes('verse-num')) {
          return (
            <b
              key={index}
              className='mr-1 text-sm font-normal text-muted-foreground'
            >
              {children}
            </b>
          );
        } else if (node.attribs.class.includes('chapter-num')) {
          return (
            <b key={index} className='mr-2 text-2xl font-semibold'>
              {children}
            </b>
          );
        }
      },
    },
    {
      // Remove <span> tags
      shouldProcessNode: (node: any) => node.name === 'span',
      processNode: (node: any, children: any) => {
        return children;
      },
    },
    {
      // Remove footnotes summary section
      shouldProcessNode: (node: any) =>
        node.name === 'div' && node.attribs.class.includes('footnotes'),
      processNode: (node: any, children: any) => {
        return null;
      },
    },
    {
      // Custom <sup> processing for footnotes and crossrefs
      shouldProcessNode: (node: any) => node.name === 'sup',
      processNode: (node: any, children: any, index: number) => {
        const note = children[0].props.title;
        if (node.attribs.class == 'footnote') {
          // Return note component as footnote
          return <Note key={index} type='footnote' content={note} />;
        } else if (node.children.find((child: any) => child.name === 'a')) {
          // Return note component as crossref
          return (
            <Note
              key={index}
              type='crossref'
              content={note}
              verse={data.canonical}
            />
          );
        }
      },
    },
    {
      // Anything else
      shouldProcessNode: () => true,
      processNode: processNodeDefinitions.processDefaultNode,
    },
  ];

  // Parse the HTML with the custom processing instructions
  const reactComponent = htmlToReactParser.parseWithInstructions(
    html,
    isValidNode,
    processingInstructions,
  );

  return reactComponent;
}

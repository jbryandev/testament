// Description: This file contains utility functions for scripture components

import * as HtmlToReact from 'html-to-react';

import Note from '@/components/scripture/note';
import { ScriptureResponse } from '@/lib/api/scipture/schema';

// Helper function to parse scripture coming from the API
export function parseScripture(data: ScriptureResponse): React.ReactNode {
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
  const reactComponent: React.ReactNode =
    htmlToReactParser.parseWithInstructions(
      html,
      isValidNode,
      processingInstructions,
    );

  return reactComponent;
}

// Helper function to parse cross references coming from the API
// and return them in a more readable and accessible format for the UI
export function parseCrossReferences(verse: string, content: string) {
  // Get the current book and chapter from given verse
  const current = getBookAndChapter(verse);

  // Remove all square brackets and 'See' or 'For' from the content
  const cleanContent = content.replace(/\[|\]|^See\s|^For\s/gi, '');

  // Split the content into individual passages by semicolon
  const passages = cleanContent.split(';');

  // Regular expression pattern to match a passage only and cut out extraneous text
  const passageRegex =
    /(((1|2|3)\s)?[A-Za-z]+\.?\s)?\d+(:\d+)?(-\d+)?(\,\s\d+)*/g;

  // Regular expression pattern to extract book name only
  // Used to add book name to passage references that don't have it
  const bookNameRegex = /^((?:(?!ch\.|ver\.)[\d\s]*[A-Za-z.]+))\s+/;

  // Variable to keep track of the last book name
  // Used in conjunction with bookNameRegex to add book name to passage references that don't have it
  let lastBookName = current.book;

  // Array to store the final result
  const result: string[] = [];

  // Loop through each passage and process it into desired format
  for (let passage of passages) {
    const matches = passage.matchAll(passageRegex);

    for (let match of matches) {
      const matchedPassage = match[0];

      if (matchedPassage.startsWith('ch.')) {
        // This passages starts with 'ch.' so we need to replace it with the current book name
        result.push(matchedPassage.replace('ch.', `${current.book}`));
      } else if (matchedPassage.startsWith('ver.')) {
        // This passages starts with 'ver.' so we need to replace it with the current book name and chapter number
        result.push(
          matchedPassage.replace(
            'ver. ',
            `${current.book} ${current.chapter}:`,
          ),
        );
      } else {
        // This passage either starts with a book name or chapter number
        const bookNameMatch = matchedPassage.match(bookNameRegex);
        if (bookNameMatch) {
          // This passage starts with a book name so we can return it and update the last book name
          lastBookName = bookNameMatch[1].trim();
          result.push(matchedPassage);
        } else {
          // This passage starts with a chapter number, so we need to add the last book name to it
          result.push(`${lastBookName} ${matchedPassage}`);
        }
      }
    }
  }

  return result;
}

// Helper function to get the book name and chapter from a given verse
// Eg: getBookAndChapter('John 3:16') => { book: 'John', chapter: '3' }
export function getBookAndChapter(passage: string) {
  // Regular expression pattern to match the book name and chapter
  const pattern = /^([A-Za-z]+)\s*(\d+(?::\d+)?)?/;
  const match = passage.match(pattern);
  if (match) {
    const book = match[1]; // Extract the matched book name
    const chapter = match[2]; // Extract the matched chapter
    return { book, chapter };
  }
  return { book: '', chapter: '' }; // Return an empty string if no match is found
}

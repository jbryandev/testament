// Description: This file contains utility functions for scripture components

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

  // Return the result as a string with each passage on a new line
  return result.join('<br>');
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

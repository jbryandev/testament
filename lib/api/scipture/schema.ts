import * as z from 'zod';

export const scriptureParams = z.object({
  q: z.string().min(3).max(100),
  'include-passage-references': z.boolean().optional(),
  'include-verse-numbers': z.boolean().optional(),
  'include-first-verse-numbers': z.boolean().optional(),
  'include-headings': z.boolean().optional(),
  'include-footnotes': z.boolean().optional(),
  'include-footnote-body': z.boolean().optional(),
  'include-copyright': z.boolean().optional(),
  'include-short-copyright': z.boolean().optional(),
  'include-css-link': z.boolean().optional(),
  'inline-styles': z.boolean().optional(),
  'wrapping-div': z.boolean().optional(),
  'div-classes': z.string().optional(),
  'paragraph-tag': z.string().optional(),
  'include-book-titles': z.boolean().optional(),
  'include-verse-anchors': z.boolean().optional(),
  'include-chapter-numbers': z.boolean().optional(),
  'include-crossrefs': z.boolean().optional(),
  'include-subheadings': z.boolean().optional(),
  'include-surrounding-chapters-below': z.string().optional(),
  'link-url': z.string().optional(),
  'crossref-url': z.string().optional(),
  'preface-url': z.string().optional(),
  'include-audio-link': z.boolean().optional(),
  'attach-audio-link-to': z.enum(['passage', 'heading']).optional(),
});

export type ScriptureParams = z.infer<typeof scriptureParams>;

export const scriptureResponse = z.object({
  query: z.string(),
  canonical: z.string(),
  parsed: z.array(z.array(z.number())),
  passage_meta: z.array(
    z.object({
      canonical: z.string(),
      chapter_start: z.array(z.number()),
      chapter_end: z.array(z.number()),
      prev_verse: z.number().nullable(),
      next_verse: z.number().nullable(),
      prev_chapter: z.union([z.array(z.number()), z.null()]),
      next_chapter: z.union([z.array(z.number()), z.null()]),
    }),
  ),
  passages: z.array(z.string()),
});

export type ScriptureResponse = z.infer<typeof scriptureResponse>;

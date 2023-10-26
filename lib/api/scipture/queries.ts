import { ScriptureParams, ScriptureResponse } from '@/lib/api/scipture/schema';
import { env } from '@/lib/env.mjs';

export const getScripture = async (query: ScriptureParams) => {
  const stringifiedQuery = Object.fromEntries(
    Object.entries(query).map(([key, value]) => [key, String(value)]),
  );

  const params = new URLSearchParams(stringifiedQuery);

  const url = `${env.ESV_API_URL}?${params.toString()}`;

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Token ${env.ESV_API_KEY}`,
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: ScriptureResponse = await response.json();
  return data;
};

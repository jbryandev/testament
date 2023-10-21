import Scripture from '@/components/scripture/scripture';
import { getScripture } from '@/lib/api/scipture/queries';
import { ScriptureParams } from '@/lib/api/scipture/schema';
import scripture from '@/lib/data/john1.json';

export default async function ReadPage() {
  // const query: ScriptureParams = {
  //   q: 'Romans 1',
  //   'include-audio-link': false,
  //   'include-crossrefs': true,
  // };
  // const data = await getScripture(query);

  const data = scripture; // TODO: Remove this line and uncomment the lines above

  return (
    <div className='container grid gap-12'>
      <Scripture data={data} />
    </div>
  );
}

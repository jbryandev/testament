import { parseScripture } from '@/components/scripture/utils';
import { ScriptureResponse } from '@/lib/api/scipture/schema';

export default function ScriptureViewer({ data }: { data: ScriptureResponse }) {
  const scripture = parseScripture(data);
  return (
    <div className='flex flex-col items-center'>
      <div className='max-w-prose'>{scripture}</div>
    </div>
  );
}

import { parseScripture } from '@/components/scripture/utils';
import { ScriptureResponse } from '@/lib/api/scipture/schema';

interface ScriptureViewerProps {
  data: ScriptureResponse;
}

export default function ScriptureViewer({ data }: ScriptureViewerProps) {
  const scripture = parseScripture(data);

  return (
    <div className='flex flex-col items-center'>
      <div className='max-w-prose'>{scripture}</div>
    </div>
  );
}

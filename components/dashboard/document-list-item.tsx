import { DocumentOperations } from '@/components/dashboard/document-operations';
import { Document } from '@/lib/db/schema/documents';
import { formatDate } from '@/lib/utils';

interface DocumentListItemProps {
  document: Document;
}

export function DocumentListItem({ document }: DocumentListItemProps) {
  return (
    <div className='flex items-center justify-between p-4'>
      <div className='grid gap-1'>
        <p className='font-semibold'>{document.title}</p>
        <div>
          <p className='text-sm text-muted-foreground'>
            {formatDate(document.createdAt!.toDateString())}
          </p>
        </div>
      </div>
      <DocumentOperations document={document} />
    </div>
  );
}

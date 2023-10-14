import { DocumentAddButton } from '@/components/dashboard/document-button';
import { DocumentListItem } from '@/components/dashboard/document-list-item';
import { EmptyPlaceholder } from '@/components/dashboard/empty-placeholder';
import { CompleteDocument } from '@/lib/db/schema/documents';

interface DocumentListProps {
  documents: CompleteDocument[];
}

export default function DocumentList({ documents }: DocumentListProps) {
  return (
    <div>
      {documents.length > 0 ? (
        <div className='divide-y divide-border rounded-md border'>
          {documents.map((document) => (
            <DocumentListItem key={document.id} document={document} />
          ))}
        </div>
      ) : (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name='document' />
          <EmptyPlaceholder.Title>No documents added</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You haven&apos;t uploaded any documents yet.
          </EmptyPlaceholder.Description>
          <DocumentAddButton variant='outline' />
        </EmptyPlaceholder>
      )}
    </div>
  );
}

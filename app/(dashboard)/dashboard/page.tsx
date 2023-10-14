import { DocumentAddButton } from '@/components/dashboard/document-button';
import DocumentList from '@/components/dashboard/document-list';
import { DashboardHeader } from '@/components/dashboard/header';
import { DashboardShell } from '@/components/dashboard/shell';
import { getDocuments } from '@/lib/api/documents/queries';

export default async function DashboardPage() {
  const { documents } = await getDocuments();

  return (
    <DashboardShell>
      <DashboardHeader
        heading='Documents'
        text='Add and manage your documents.'
      >
        <DocumentAddButton />
      </DashboardHeader>
      <DocumentList documents={documents} />
    </DashboardShell>
  );
}

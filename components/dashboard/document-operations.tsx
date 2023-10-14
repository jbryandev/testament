'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import DocumentForm from '@/components/dashboard/document-form';
import { Icons } from '@/components/icons';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import { Document } from '@/lib/db/schema/documents';
import { trpc } from '@/lib/trpc/client';

interface DocumentOperationsProps {
  document: Document;
}

export function DocumentOperations({ document }: DocumentOperationsProps) {
  const router = useRouter();
  const utils = trpc.useContext();
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState<boolean>(false);

  const { mutate: deleteDocument, isLoading: isDeleting } =
    trpc.documents.deleteDocument.useMutation({
      onSuccess: () => onSuccess(),
    });

  const onSuccess = () => {
    utils.documents.getDocuments.invalidate();
    router.refresh();
    toast({
      title: 'Success!',
      description: 'Document deleted',
      variant: 'default',
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className='flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:bg-muted'>
          <Icons.ellipsis className='h-4 w-4' />
          <span className='sr-only'>Open</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem
            className='flex cursor-pointer items-center'
            onSelect={() => setOpen(true)}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className='flex cursor-pointer items-center text-destructive focus:text-destructive'
            onSelect={() => setShowDeleteAlert(true)}
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Dialog onOpenChange={setOpen} open={open}>
        <DialogContent>
          <DialogHeader className='px-5 pt-5'>
            <DialogTitle>Edit Document</DialogTitle>
          </DialogHeader>
          <div className='px-5 pb-5'>
            <DocumentForm closeModal={closeModal} document={document} />
          </div>
        </DialogContent>
      </Dialog>
      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this document?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteDocument({ id: document.id! })}
              className='bg-red-600 focus:ring-red-600'
            >
              {isDeleting ? (
                <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
              ) : (
                <Icons.trash className='mr-2 h-4 w-4' />
              )}
              <span>Delete</span>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

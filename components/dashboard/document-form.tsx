'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import {
  Document,
  NewDocumentParams,
  insertDocumentParams,
} from '@/lib/db/schema/documents';
import { trpc } from '@/lib/trpc/client';

interface DocumentFormProps extends React.HTMLAttributes<HTMLFormElement> {
  document?: Document;
  closeModal: () => void;
}

type FormData = z.infer<typeof insertDocumentParams>;

const DocumentForm = ({ document, closeModal }: DocumentFormProps) => {
  const { toast } = useToast();

  const editing = !!document?.id;

  const router = useRouter();
  const utils = trpc.useContext();

  const form = useForm<FormData>({
    // latest Zod release has introduced a TS error with zodResolver
    // open issue: https://github.com/colinhacks/zod/issues/2663
    // errors locally but not in production
    resolver: zodResolver(insertDocumentParams),
    defaultValues: document ?? {
      title: 'Untitled Document',
      url: '',
      active: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  const { mutate: createDocument, isLoading: isCreating } =
    trpc.documents.createDocument.useMutation({
      onSuccess: () => onSuccess('create'),
      onError: (error) => onError(error),
    });

  const { mutate: updateDocument, isLoading: isUpdating } =
    trpc.documents.updateDocument.useMutation({
      onSuccess: () => onSuccess('update'),
    });

  const handleSubmit = (values: NewDocumentParams) => {
    if (editing) {
      updateDocument({ ...values, id: document.id!, updatedAt: new Date() });
    } else {
      createDocument(values);
    }
  };

  const onSuccess = (action: 'create' | 'update') => {
    utils.documents.getDocuments.invalidate();
    router.refresh();
    closeModal();
    toast({
      title: 'Success!',
      description: `Document ${action}d`,
      variant: 'default',
    });
  };

  const onError = (error: any) => {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive',
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={'space-y-8'}>
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='active'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Active</FormLabel>
              <br />
              <FormControl>
                <Checkbox
                  {...field}
                  checked={!!field.value}
                  onCheckedChange={field.onChange}
                  value={''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type='submit'
          className='mr-1'
          disabled={isCreating || isUpdating}
        >
          {editing
            ? `Sav${isUpdating ? 'ing...' : 'e'}`
            : `Creat${isCreating ? 'ing...' : 'e'}`}
        </Button>
      </form>
    </Form>
  );
};

export default DocumentForm;

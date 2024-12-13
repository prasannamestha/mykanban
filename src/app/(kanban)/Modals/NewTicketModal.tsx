import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useKanbanStore, useModalStore } from '../store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Textarea } from '@/components/ui/textarea';
import { FormEvent } from 'react';

export const NewTicketModal = () => {
  const { activeModalId, reset, metadata } = useModalStore();
  const { findColumnById, addTicket } = useKanbanStore();

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;

    addTicket(metadata?.columnId || '', {
      title,
      category,
      description: description || '',
    });
    reset();
  };

  return (
    <Dialog open={activeModalId === 'create-new-ticket'} onOpenChange={reset}>
      <DialogContent>
        <form onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle>Create new ticket</DialogTitle>
            <DialogDescription>
              You are creating a new ticket under{' '}
              <span className="font-semibold">
                &quot;{findColumnById(metadata?.columnId || '')?.name}&quot;
              </span>
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-4 w-full">
            <Input
              name="title"
              className="col-span-3"
              placeholder="Title"
              required
            />

            <Textarea
              name="description"
              className="resize-none w-full box-border"
              placeholder="Ticket description"
              rows={4}
            />

            <Select name="category" defaultValue="Engineering" required>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent aria-required="true">
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

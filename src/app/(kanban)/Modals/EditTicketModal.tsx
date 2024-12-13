import { FormEvent, useMemo } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import { useKanbanStore, useModalStore } from '../store';
import { ConfirmationBtn } from '../ConfirmationBtn';
import { Trash } from 'lucide-react';

export const EDIT_TICKET_MODAL_ID = 'edit-ticket-modal';

export const EditTicketModal = () => {
  const { activeModalId, reset, metadata } = useModalStore();
  const { removeTicket, updateTicket, findTicketById } = useKanbanStore();

  const ticket = useMemo(() => {
    if (!metadata?.ticketId) return null;

    return findTicketById(metadata.ticketId);
  }, [findTicketById, metadata]);

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!ticket?.id) return;
    const formData = new FormData(e.currentTarget);

    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const category = formData.get('category') as string;

    updateTicket(metadata?.ticketId || '', {
      id: ticket.id,
      title,
      category,
      description: description || '',
    });
    reset();
  };

  return (
    <Dialog open={activeModalId === EDIT_TICKET_MODAL_ID} onOpenChange={reset}>
      <DialogContent>
        <form onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle>Create new ticket</DialogTitle>
            <DialogDescription>
              You are updating ticket information.
            </DialogDescription>
          </DialogHeader>

          <div className="flex w-full flex-col gap-4 py-4">
            <Input
              name="title"
              className="col-span-3"
              placeholder="Title"
              defaultValue={ticket?.title}
              required
            />

            <Textarea
              name="description"
              className="box-border w-full resize-none"
              placeholder="Ticket description"
              rows={4}
              defaultValue={ticket?.description}
            />

            <Select name="category" defaultValue={ticket?.category} required>
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
            <div className="flex w-full justify-between">
              <ConfirmationBtn
                defaultText={<Trash className="w-4" />}
                confirmationText="Click again to delete this ticket"
                variant="destructive"
                onConfirm={() => {
                  removeTicket(metadata?.ticketId || '');
                  reset();
                }}
              />
              <Button type="submit">Save</Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

import { FormEvent } from 'react';
import { Trash } from 'lucide-react';

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
import { Label } from '@/components/ui/label';

import { ConfirmationBtn } from '../ConfirmationBtn';
import { useKanbanStore, useModalStore } from '../store';

export const EDIT_COLUMN_MODAL = 'edit-column-modal';

export const EditColumnModal = () => {
  const { activeModalId, reset, metadata } = useModalStore();
  const { findColumnById, deleteColumn, renameColumn } = useKanbanStore();

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!metadata?.columnId) return;

    const formData = new FormData(e.currentTarget);
    const newName = formData.get('column-name') as string;

    renameColumn(metadata.columnId, newName);
    reset();
  };
  return (
    <Dialog open={activeModalId === EDIT_COLUMN_MODAL} onOpenChange={reset}>
      <DialogContent>
        <form onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle>Edit Column</DialogTitle>
            <DialogDescription>
              Here you can either rename or delete a column. Tread carefully!
            </DialogDescription>
          </DialogHeader>

          <div className="flex w-full flex-col gap-4 py-8">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="column-name">Column name</Label>
              <Input
                type="text"
                id="column-name"
                name="column-name"
                placeholder="Enter column name here"
                required
                defaultValue={findColumnById(metadata?.columnId || '')?.name}
              />
            </div>
          </div>

          <DialogFooter>
            <div className="flex w-full justify-between">
              <ConfirmationBtn
                defaultText={<Trash className="w-4" />}
                confirmationText="Click again to delete this column"
                variant="destructive"
                onConfirm={() => {
                  deleteColumn(metadata?.columnId || '');
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

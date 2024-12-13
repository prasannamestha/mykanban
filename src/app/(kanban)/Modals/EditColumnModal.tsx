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

import { Label } from '@/components/ui/label';
import { Trash } from 'lucide-react';
import { ConfirmationBtn } from '../ConfirmationBtn';

export const EDIT_COLUMN_MODAL = 'edit-column-modal';

export const EditColumnModal = () => {
  const { activeModalId, reset, metadata } = useModalStore();
  const { findColumnById, deleteColumn } = useKanbanStore();

  const handleSave = () => {};
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

          <div className="flex flex-col gap-4 py-8 w-full">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="column-name">Column name</Label>
              <Input
                type="text"
                id="column-name"
                placeholder="Enter column name here"
                required
                defaultValue={findColumnById(metadata?.columnId || '')?.name}
              />
            </div>
          </div>

          <DialogFooter>
            <div className="flex justify-between w-full">
              <ConfirmationBtn
                defaultText={<Trash />}
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

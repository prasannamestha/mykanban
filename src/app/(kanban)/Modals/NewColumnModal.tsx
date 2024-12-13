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
import { FormEvent } from 'react';

export const NEW_COLUMN_MODAL = 'new-column-modal';

export const NewColumnModal = () => {
  const { activeModalId, reset } = useModalStore();
  const { addNewColumn } = useKanbanStore();

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const columnName = formData.get('column-name') as string;

    addNewColumn(columnName);
    reset();
  };
  return (
    <Dialog open={activeModalId === NEW_COLUMN_MODAL} onOpenChange={reset}>
      <DialogContent>
        <form onSubmit={handleSave}>
          <DialogHeader>
            <DialogTitle>Add new column</DialogTitle>
            <DialogDescription>
              This will appear as a new lane on your Kanban board.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4 py-8 w-full">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="column-name">Column name</Label>
              <Input
                type="text"
                id="column-name"
                name="column-name"
                placeholder="Enter column name here"
                required
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

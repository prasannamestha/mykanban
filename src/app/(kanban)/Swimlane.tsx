import { useDroppable } from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { EDIT_COLUMN_MODAL } from './Modals/EditColumnModal';
import { Ticket as TicketType, useModalStore } from './store/';
import { SortableTicket } from './Ticket';

type SwimLaneProps = {
  title: string;
  id: string;
  tickets: TicketType[];
};

const SwimLane = ({ title, id, tickets }: SwimLaneProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id, // Make the entire SwimLane a droppable zone
  });
  const { openModal } = useModalStore();
  // const { deleteColumn } = useKanbanStore();

  return (
    <div
      className={cn(
        'ease group flex w-72 shrink-0 flex-col transition-colors duration-300',
        {
          'bg-gray-900 bg-opacity-50': isOver,
        }
      )}
      ref={setNodeRef}
    >
      <div className="flex h-10 items-center justify-between">
        <div className="sticky top-0 flex flex-1 shrink-0 items-center">
          <Button
            variant="ghost"
            className="block text-sm !font-semibold text-white"
            onClick={() => openModal(EDIT_COLUMN_MODAL, { columnId: id })}
          >
            {title} {tickets.length ? `(${tickets.length})` : null}
          </Button>
          {/* <span className="ml-2 rounded bg-slate-700 px-2 py-1 text-sm font-semibold text-white">
            
          </span> */}
        </div>
        <div className="md:opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Button
            variant="outline"
            onClick={() => openModal('create-new-ticket', { columnId: id })}
            title="Create new ticket"
          >
            <Plus className="w-4" />
          </Button>
        </div>
      </div>

      {/* SortableContext for ticket reordering */}
      <SortableContext
        items={tickets.map((ticket) => ticket.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex h-full flex-col justify-start gap-2 pb-2">
          {tickets.map((ticket) => (
            <SortableTicket key={ticket.id} id={ticket.id} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export { SwimLane };

import { useDroppable } from '@dnd-kit/core';
import { SortableTicket } from './Ticket';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Ticket as TicketType, useModalStore } from './store/';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react';
import { EDIT_COLUMN_MODAL } from './Modals/EditColumnModal';

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
        'flex w-72 shrink-0 flex-col transition-colors ease duration-300 group',
        {
          'bg-gray-900 bg-opacity-50': isOver,
        }
      )}
      ref={setNodeRef}
    >
      <div className="flex justify-between h-10 items-center">
        <div className="flex items-center shrink-0 flex-1 sticky top-0">
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
        <div className="transition-opacity duration-300 opacity-0 group-hover:opacity-100">
          <Button
            variant="outline"
            onClick={() => openModal('create-new-ticket', { columnId: id })}
            title="Create new ticket"
          >
            <Plus className="w-2" />
          </Button>
        </div>
      </div>

      {/* SortableContext for ticket reordering */}
      <SortableContext
        items={tickets.map((ticket) => ticket.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex flex-col justify-start gap-2 pb-2 h-full">
          {tickets.map((ticket) => (
            <SortableTicket key={ticket.id} id={ticket.id} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

export { SwimLane };

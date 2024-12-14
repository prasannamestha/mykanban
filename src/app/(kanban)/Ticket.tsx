import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Edit, Trash } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { useKanbanStore, useModalStore } from './store/';
import { EDIT_TICKET_MODAL_ID } from './Modals/EditTicketModal';

type TicketProps = {
  id: string;
  title: string;
  category: string;
  description: string;
  dragOverlay?: boolean;
};

const Ticket = ({
  id,
  title,
  category,
  description,
  dragOverlay = false,
}: TicketProps) => {
  const { openModal } = useModalStore();
  const { removeTicket } = useKanbanStore();

  return (
    <div
      className={cn(
        'relative mt-3 flex flex-col items-start rounded-lg border border-zinc-700 bg-zinc-900 p-4 text-neutral-400 group/ticket touch-manipulation',
        dragOverlay ? 'z-50 opacity-50' : ''
      )}
    >
      <div className="absolute right-0 top-0 group/ticket-actions flex">
        <Button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => {
            removeTicket(id);
          }}
          variant="ghost"
          className="opacity-0 group-hover/ticket-actions:opacity-100 transition-all ease duration-300 hover:bg-destructive/80"
          aria-label="Edit ticket"
          size="icon"
        >
          <Trash className="w-2" />
        </Button>
        <Button
          onPointerDown={(e) => e.stopPropagation()}
          onClick={() => {
            openModal(EDIT_TICKET_MODAL_ID, { ticketId: id });
          }}
          variant="ghost"
          className="opacity-0 group-hover/ticket:opacity-100 transition-opacity ease-in-out duration-300"
          aria-label="Edit ticket"
          size="icon"
        >
          <Edit className="w-2" />
        </Button>
      </div>
      <span
        className={cn(
          'flex h-6 items-center rounded-full px-3 text-xs font-semibold text-white',
          category === 'Design' ? 'bg-pink-500' : 'bg-teal-600'
        )}
      >
        {category}
      </span>
      <h4 className="mt-3 text-base font-bold text-neutral-300">{title}</h4>
      <p className="mt-1 text-sm">{description}</p>
    </div>
  );
};

type SortableTicketProps = {
  id: string;
};

const SortableTicket = ({ id }: SortableTicketProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const { findTicketById } = useKanbanStore();

  const ticket = findTicketById(id);

  if (!ticket) return null;

  const { title, category, description } = ticket;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <Ticket
        id={id}
        title={title}
        category={category}
        description={description}
        dragOverlay={isDragging}
      />
    </div>
  );
};

export { SortableTicket, Ticket };

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Trash, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

import { useKanbanStore } from './store/';
import { useDeleteTicketStore } from './store/useDeleteTicketStore';

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
  const { removeTicket } = useKanbanStore();
  const { ticketToDelete, setTicketToDelete } = useDeleteTicketStore();

  return (
    <div
      className={cn(
        'relative mt-3 flex flex-col items-start rounded-lg border border-zinc-700 bg-zinc-900 p-4 text-neutral-400',
        dragOverlay ? 'z-50 opacity-50' : ''
      )}
    >
      <Button
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (ticketToDelete === id) {
            removeTicket(id);
            setTicketToDelete('');
            return;
          }
          setTicketToDelete(id);
        }}
        variant="ghost"
        className={cn('absolute right-0 top-0 p-2', {
          'bg-destructive text-destructive-foreground dark:hover:bg-destructive':
            ticketToDelete === id,
        })}
        title="Double click to delete"
      >
        {ticketToDelete === id ? (
          <Trash className="w-4" />
        ) : (
          <X className="w-4" />
        )}
      </Button>
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

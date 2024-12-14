'use client';

import { useState } from 'react';
import {
  CollisionDetection,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  pointerWithin,
  rectIntersection,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';

import { NEW_COLUMN_MODAL } from './Modals/NewColumnModal';
import { Ticket as TicketType, useKanbanStore, useModalStore } from './store/';
import { SwimLane } from './Swimlane';
import { Ticket } from './Ticket';

const KanbanBoard = () => {
  const { columns, moveTicket } = useKanbanStore();
  const { openModal } = useModalStore();
  const [activeTicket, setActiveTicket] = useState<TicketType>();

  const sensors = useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 0,
      },
    }),
    useSensor(KeyboardSensor)
  );

  const findColumnId = (ticketOrColumnId: string) => {
    const foundColumn = columns.find((c) => c.id === ticketOrColumnId);
    if (foundColumn) return foundColumn.id;

    return columns.find((col) =>
      col.tickets.some((ticket) => ticket.id === ticketOrColumnId)
    )?.id;
  };

  const handleDragStart = ({ active }: DragStartEvent) => {
    const columnId = findColumnId(active.id as string);
    const ticket = columns
      .find((col) => col.id === columnId)
      ?.tickets.find((t) => t.id === active.id);

    setActiveTicket(ticket);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) return;
    const activeId = active.id as string;

    const activeColumnId = findColumnId(activeId);
    const overColumnId = findColumnId(over.id as string);

    if (activeColumnId && overColumnId && activeColumnId !== overColumnId) {
      moveTicket(
        activeId,
        activeColumnId,
        overColumnId,
        columns.find((col) => col.id === overColumnId)?.tickets.length || 0
      );
    }
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      setActiveTicket(undefined);
      return;
    }

    const activeId = active.id as string;

    const activeColumnId = findColumnId(activeId);
    const overColumnId = findColumnId(over.id as string);

    if (activeColumnId && overColumnId) {
      const targetColumn = columns.find((col) => col.id === overColumnId);
      const targetTickets = targetColumn?.tickets || [];

      const overIndex = targetTickets.findIndex((t) => t.id === over.id);
      const targetIndex = overIndex === -1 ? targetTickets.length : overIndex; // Insert at the end if no exact match

      moveTicket(activeId, activeColumnId, overColumnId, targetIndex);
    }

    setActiveTicket(undefined);
  };

  const customCollisionDetectionAlgorithm: CollisionDetection = (args) => {
    // First, let's see if there are any collisions with the pointer
    const pointerCollisions = pointerWithin(args);

    // Collision detection algorithms return an array of collisions
    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }

    // If there are no collisions with the pointer, return rectangle intersections
    return rectIntersection(args);
  };

  return (
    <div className="w-screen md:max-w-7xl md:mx-auto md:px-6 overflow-visible">
      <DndContext
        collisionDetection={customCollisionDetectionAlgorithm}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        {/* SortableContext for cross-column sorting */}
        <SortableContext
          items={columns.flatMap((col) => col.tickets.map((t) => t.id))}
          strategy={rectSortingStrategy}
        >
          <div className="flex min-h-screen flex-col overflow-auto">
            <div className="pl-6 md:pl-0 mt-4 flex grow space-x-6 overflow-auto">
              {columns.map((col) => (
                <SwimLane
                  key={col.id}
                  id={col.id}
                  title={col.name}
                  tickets={col.tickets}
                />
              ))}
              <div className="shrink-0 border-l border-zinc-900  pl-16 pr-4">
                <Button
                  variant="outline"
                  onClick={() => openModal(NEW_COLUMN_MODAL)}
                >
                  Add column <Plus className="ml-1 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </SortableContext>
        <DragOverlay>
          {activeTicket ? (
            <Ticket
              id={activeTicket.id}
              title={activeTicket.title}
              category={activeTicket.category}
              description={activeTicket.description}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export { KanbanBoard };

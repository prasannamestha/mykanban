'use client';

import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  pointerWithin,
  rectIntersection,
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Ticket as TicketType, useKanbanStore } from './store/';
import { SwimLane } from './Swimlane';
import { Ticket } from './Ticket';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const KanbanBoard = () => {
  const { columns, moveTicket } = useKanbanStore();
  const [activeTicket, setActiveTicket] = useState<TicketType>();

  const findColumnId = (ticketOrColumnId: string) => {
    const foundColumn = columns.find((c) => c.id === ticketOrColumnId);
    if (foundColumn) return foundColumn.id;

    return columns.find((col) =>
      col.tickets.some((ticket) => ticket.id === ticketOrColumnId)
    )?.id;
  };

  const handleDragStart = ({ active }) => {
    const columnId = findColumnId(active.id);
    const ticket = columns
      .find((col) => col.id === columnId)
      ?.tickets.find((t) => t.id === active.id);

    setActiveTicket(ticket);
  };

  const handleDragOver = ({ active, over }) => {
    if (!over) return;

    const activeColumnId = findColumnId(active.id);
    const overColumnId = findColumnId(over.id);

    if (activeColumnId && overColumnId && activeColumnId !== overColumnId) {
      moveTicket(
        active.id,
        activeColumnId,
        overColumnId,
        columns.find((col) => col.id === overColumnId)?.tickets.length || 0
      );
    }
  };

  const handleDragEnd = ({ active, over }) => {
    if (!over) {
      setActiveTicket(null);
      return;
    }

    const activeColumnId = findColumnId(active.id);
    const overColumnId = findColumnId(over.id);

    if (activeColumnId && overColumnId) {
      const targetColumn = columns.find((col) => col.id === overColumnId);
      const targetTickets = targetColumn?.tickets || [];

      const overIndex = targetTickets.findIndex((t) => t.id === over.id);
      const targetIndex = overIndex === -1 ? targetTickets.length : overIndex; // Insert at the end if no exact match

      moveTicket(active.id, activeColumnId, overColumnId, targetIndex);
    }

    setActiveTicket(undefined);
  };

  function customCollisionDetectionAlgorithm(args) {
    // First, let's see if there are any collisions with the pointer
    const pointerCollisions = pointerWithin(args);

    // Collision detection algorithms return an array of collisions
    if (pointerCollisions.length > 0) {
      return pointerCollisions;
    }

    // If there are no collisions with the pointer, return rectangle intersections
    return rectIntersection(args);
  }

  return (
    <DndContext
      collisionDetection={customCollisionDetectionAlgorithm}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      {/* SortableContext for cross-column sorting */}
      <SortableContext
        items={columns.flatMap((col) => col.tickets.map((t) => t.id))}
        strategy={rectSortingStrategy}
      >
        <div className="flex flex-col overflow-auto min-h-screen">
          <div className="mt-4 flex grow space-x-6 overflow-auto">
            {columns.map((col) => (
              <SwimLane
                key={col.id}
                id={col.id}
                title={col.name}
                tickets={col.tickets}
              />
            ))}
            <div className="pl-16 shrink-0 flex justify-end border-l border-zinc-900">
              <Button variant="outline">
                Add column <Plus />
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
  );
};

export { KanbanBoard };

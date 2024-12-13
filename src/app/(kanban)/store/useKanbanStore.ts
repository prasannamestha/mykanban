import { produce } from 'immer';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export type Column = {
  id: string;
  name: string;
  tickets: Ticket[];
};

export type Ticket = {
  id: string;
  title: string;
  description: string;
  category: string;
};

const defaultColumns: Column[] = [
  {
    id: 'backlog',
    name: 'Backlog',
    tickets: [
      {
        id: 'default-backlog-task-1',
        title: 'Backlog task 1',
        category: 'Engineering',
        description: '',
      },
      {
        id: 'default-backlog-task-2',
        title: 'Backlog task 2',
        category: 'Design',
        description: '',
      },
    ],
  },
  {
    id: 'in-progress',
    name: 'In Progress',
    tickets: [],
  },
  {
    id: 'in-review',
    name: 'In Review',
    tickets: [],
  },
  {
    id: 'done',
    name: 'Done',
    tickets: [],
  },
];

export type KanbanStore = {
  columns: Column[];
  addNewColumn: (name: string) => void;
  deleteColumn: (id: Column['id']) => void;
  addTicket: (columnId: string, ticket: Omit<Ticket, 'id'>) => void;
  moveTicket: (
    ticketId: string,
    sourceColumnId: string,
    targetColumnId: string,
    targetIndex: number
  ) => void;
  removeTicket: (ticketId: string) => void;
  findColumnById: (id: string) => Column | undefined;
  findTicketById: (id: string) => Ticket | undefined;
};

export const useKanbanStore = create(
  persist<KanbanStore>(
    (set, get) => ({
      columns: [],

      addNewColumn: (name) => {
        return set((state) => ({
          columns: produce(state.columns, (draft) => {
            const newColumn: Column = {
              id: uuidv4(),
              name,
              tickets: [],
            };
            draft.push(newColumn);
          }),
        }));
      },
      deleteColumn: (id) => {
        return set((state) => ({
          columns: produce(state.columns, (draft) => {
            const columnIndex = draft.findIndex((c) => c.id === id);
            draft.splice(columnIndex, 1);
          }),
        }));
      },

      addTicket: (columnId, ticket) =>
        set((state) => ({
          columns: produce(state.columns, (draft) => {
            const column = draft.find((col) => col.id === columnId);
            if (column) {
              column.tickets.push({
                id: uuidv4(),
                ...ticket,
              });
            }
          }),
        })),

      moveTicket: (ticketId, sourceColumnId, targetColumnId, targetIndex) =>
        set((state) => ({
          columns: produce(state.columns, (draft) => {
            const sourceColumnIndex = draft.findIndex(
              (c) => c.id === sourceColumnId
            );

            const ticket = state
              .findColumnById(sourceColumnId)
              ?.tickets.find((t) => t.id === ticketId);

            if (ticket) {
              if (sourceColumnIndex >= 0) {
                // Find and remove ticket
                draft[sourceColumnIndex].tickets = draft[
                  sourceColumnIndex
                ]?.tickets.filter((t) => t.id !== ticketId);
              }

              // Add ticket to target column
              const targetColumn = draft.find(
                (col) => col.id === targetColumnId
              );
              if (targetColumn) {
                targetColumn.tickets.splice(targetIndex, 0, ticket);
              }
            }
          }),
        })),

      removeTicket: (id) =>
        set((state) => ({
          columns: produce(state.columns, (draft) => {
            for (let i = 0; i < draft.length; i++) {
              const ticketFound = draft[i].tickets.find((t) => t.id === id);
              if (ticketFound) {
                draft[i].tickets = draft[i].tickets.filter((t) => t.id !== id);
              }
            }
          }),
        })),

      findColumnById: (id) => {
        return get().columns.find((col) => col.id === id);
      },

      findTicketById: (id) => {
        return get()
          .columns.flatMap((col) => col.tickets)
          .find((ticket) => ticket.id === id);
      },
    }),
    {
      name: 'my-kanban-store-v0.1',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

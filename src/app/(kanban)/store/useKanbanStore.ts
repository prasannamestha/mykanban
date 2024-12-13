import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

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
        title: 'Move this ticket around',
        category: 'Design',
        description:
          'You can drag & drop this ticket in any columns here. Try it!',
      },
      {
        id: 'default-backlog-task-2',
        title: 'Add new ticket',
        category: 'Engineering',
        description:
          'You can click on the + icon (near the column heading) above to add a new ticket in that column.',
      },
      {
        id: 'default-backlog-task-3',
        title: 'Add new column',
        category: 'Engineering',
        description: 'Scroll right to reveal a button to add new column.',
      },
    ],
  },
  {
    id: 'in-progress',
    name: 'In Progress',
    tickets: [
      {
        id: 'default-in-progress-task-1',
        title: 'Start using MyKanban',
        category: 'Engineering',
        description: 'Use MyKanban for managing my daily work & projects',
      },
    ],
  },
  {
    id: 'in-review',
    name: 'In Review',
    tickets: [],
  },
  {
    id: 'done',
    name: 'Done',
    tickets: [
      {
        id: 'done-task-1',
        title: 'Data is stored on this machine only',
        description:
          'MyKanban uses LocalStorage - so all this data is only available to you on this machine. Let us know if you need cloud-sync by writing to prasanna@uibun.dev',
        category: 'Engineering',
      },
    ],
  },
];

export type KanbanStore = {
  status: 'loading' | 'ready';
  setStatus: (status: KanbanStore['status']) => void;
  columns: Column[];
  setColumns: (cols: KanbanStore['columns']) => void;
  addNewColumn: (name: string) => void;
  renameColumn: (id: Column['id'], newName: Column['name']) => void;
  deleteColumn: (id: Column['id']) => void;
  addTicket: (columnId: string, ticket: Omit<Ticket, 'id'>) => void;
  updateTicket: (ticketId: Ticket['id'], ticket: Ticket) => void;
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
      status: 'loading',
      columns: [],

      setStatus: (status) => set({ status }),
      setColumns: (cols) => set({ columns: cols }),

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

      renameColumn: (id, name) =>
        set((state) => ({
          columns: produce(state.columns, (draft) => {
            const columnIndex = draft.findIndex((c) => c.id === id);
            if (columnIndex < 0) return;

            // Column found - rename
            draft[columnIndex].name = name;
          }),
        })),

      deleteColumn: (id) => {
        return set((state) => ({
          columns: produce(state.columns, (draft) => {
            const columnIndex = draft.findIndex((c) => c.id === id);
            if (columnIndex < 0) return;

            // Column found - delete
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
      updateTicket: (ticketId, ticket) =>
        set((state) => ({
          columns: produce(state.columns, (draft) => {
            for (let i = 0; i < draft.length; i++) {
              for (let j = 0; j < draft[i].tickets.length; j++) {
                if (draft[i].tickets[j].id === ticketId) {
                  // update
                  draft[i].tickets[j] = ticket;
                  break;
                }
              }
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
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            state.setStatus('ready');
            if (state.columns.length === 0) {
              state.setColumns(defaultColumns);
            }
          }
        };
      },
    }
  )
);

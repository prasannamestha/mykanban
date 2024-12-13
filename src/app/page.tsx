'use client';
import { useEffect } from 'react';
import { Header } from './(kanban)/Header';
import { KanbanBoard } from './(kanban)/KanbanBoard';
import { NewTicketModal } from './(kanban)/Modals/';
import { useDeleteTicketStore } from './(kanban)/store/useDeleteTicketStore';
import { useKanbanStore } from './(kanban)/store';

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

export default function Home() {
  const { setTicketToDelete } = useDeleteTicketStore();

  useEffect(() => {
    const clickHandler = () => {
      setTicketToDelete('');
    };
    window.addEventListener('click', clickHandler);

    return () => {
      window.removeEventListener('click', clickHandler);
    };
  }, []);
  return (
    <div className="">
      <div className=" w-screen max-w-7xl mx-auto px-6">
        <Header />
        <KanbanBoard />
      </div>

      <NewTicketModal />
    </div>
  );
}

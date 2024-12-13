'use client';
import { useEffect } from 'react';
import { Header } from './(kanban)/Header';
import { KanbanBoard } from './(kanban)/KanbanBoard';
import { NewTicketModal } from './(kanban)/Modals/';
import { useDeleteTicketStore } from './(kanban)/store/useDeleteTicketStore';
import { EditColumnModal } from './(kanban)/Modals/EditColumnModal';
import { NewColumnModal } from './(kanban)/Modals/NewColumnModal';

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
      <div className=" w-screen max-w-7xl mx-auto px-6 overflow-visible">
        <Header />
        <KanbanBoard />
      </div>

      <NewTicketModal />
      <EditColumnModal />
      <NewColumnModal />
    </div>
  );
}

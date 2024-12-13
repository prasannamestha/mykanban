'use client';
import { Header } from './(kanban)/Header';
import { KanbanBoard } from './(kanban)/KanbanBoard';
import { NewTicketModal } from './(kanban)/Modals/NewTicketModal';

import { EditColumnModal } from './(kanban)/Modals/EditColumnModal';
import { NewColumnModal } from './(kanban)/Modals/NewColumnModal';
import { EditTicketModal } from './(kanban)/Modals/EditTicketModal';
import { PromoBanner } from './PromoBanner';

export default function Home() {
  return (
    <div className="">
      <PromoBanner />
      <div className=" w-screen max-w-7xl mx-auto px-6 overflow-visible">
        <Header />
        <KanbanBoard />
      </div>

      <NewTicketModal />
      <EditTicketModal />
      <EditColumnModal />
      <NewColumnModal />
    </div>
  );
}

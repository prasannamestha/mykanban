'use client';
import { Header } from './(kanban)/Header';
import { KanbanBoard } from './(kanban)/KanbanBoard';
import { NewTicketModal } from './(kanban)/Modals/NewTicketModal';

import { EditColumnModal } from './(kanban)/Modals/EditColumnModal';
import { NewColumnModal } from './(kanban)/Modals/NewColumnModal';
import { EditTicketModal } from './(kanban)/Modals/EditTicketModal';
import Link from 'next/link';

const LMNSQZY_URL =
  'https://privjs.lemonsqueezy.com/buy/ba60a963-8360-4869-acc0-68c6f57732c2';

export default function Home() {
  return (
    <div className="">
      <div className=" z-50 w-full border-b border-zinc-700 bg-zinc-900 px-4 py-2">
        <p className="text-center text-sm text-neutral-300">
          <Link className="underline" href="https://uibun.dev">
            UiBun
          </Link>{' '}
          is a drag & drop tailwind website builder,{' '}
          <a
            href={LMNSQZY_URL}
            className=" font-semibold text-neutral-200 underline"
          >
            Click here
          </a>{' '}
          to claim lifetime access deal ✨🚀
        </p>
      </div>
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

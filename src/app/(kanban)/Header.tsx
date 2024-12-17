import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

const Header = () => {
  return (
    <div className="w-screen max-w-7xl mx-auto px-6">
      <div className="flex items-center justify-between border-b border-gray-700 pb-4 pt-8">
        <Link href="https://www.uibun.dev" className="group">
          <h1 className="text-2xl font-bold">My Kanban</h1>
          <p>A beautiful free kanban board.</p>
        </Link>
        <div>
          <Link
            href="https://www.uibun.dev"
            className={buttonVariants({ variant: 'ghost' })}
          >
            Built with UiBun ❤️
          </Link>
        </div>
      </div>
    </div>
  );
};

export { Header };

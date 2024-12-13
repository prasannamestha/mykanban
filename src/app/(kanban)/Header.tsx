import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

const Header = () => {
  return (
    <div className="flex items-center justify-between border-b border-gray-700 pb-4 pt-8">
      <Link href="https://uibun.dev" className="group">
        <h1 className="text-2xl font-bold">My Kanban</h1>
        <p>
          A free kanban board from{' '}
          <span className="font-semibold group-hover:underline">UiBun</span>
        </p>
      </Link>
      <div>
        <Link
          href="https://uibun.dev"
          className={buttonVariants({ variant: 'ghost' })}
        >
          Built with UiBun ❤️
        </Link>
      </div>
    </div>
  );
};

export { Header };

import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';

const Header = () => {
  return (
    <div className="flex items-center justify-between border-b border-gray-700 pb-4 pt-8">
      <div className="group">
        <h1 className="text-2xl font-bold">My Kanban</h1>
        <p>
          A personal kanban board from{' '}
          <Link
            className="font-semibold group-hover:underline"
            href="uibun.dev"
          >
            UiBun
          </Link>
        </p>
      </div>
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

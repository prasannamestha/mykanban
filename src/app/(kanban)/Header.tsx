import { buttonVariants } from '@/components/ui/button';

const Header = () => {
  return (
    <div className="pt-8 pb-4 border-b border-gray-700 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">Cute Kanban</h1>
        <p>A personal kanban board</p>
      </div>
      <div>
        <a
          href="https://uibun.dev"
          className={buttonVariants({ variant: 'ghost' })}
        >
          Built with UiBun ❤️
        </a>
      </div>
    </div>
  );
};

export { Header };

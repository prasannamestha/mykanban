import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import Link from 'next/link';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const LMNSQZY_URL =
  'https://privjs.lemonsqueezy.com/buy/ba60a963-8360-4869-acc0-68c6f57732c2';

type PromoBannerStore = {
  status: 'loading' | 'ready';
  setStatus: (status: PromoBannerStore['status']) => void;
  isHidden: boolean;
  setIsHidden: (isHidden: PromoBannerStore['isHidden']) => void;
};
const usePromoBannerStore = create(
  persist<PromoBannerStore>(
    (set) => ({
      status: 'loading',
      setStatus: (status) => set({ status }),
      isHidden: false,
      setIsHidden: (isHidden) => set({ isHidden }),
    }),
    {
      name: 'mykanban-promo-banner-store',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => {
        return (state) => {
          if (state) {
            state.setStatus('ready');
          }
        };
      },
    }
  )
);
export const PromoBanner = () => {
  const { status, isHidden, setIsHidden } = usePromoBannerStore();
  if (status !== 'ready' || isHidden) return null;

  return (
    <div className="relative z-50 w-full border-b border-zinc-700 bg-zinc-900 px-4 py-2 hidden md:block">
      <p className="text-center text-sm text-neutral-300">
        <Link className="underline" href="https://www.uibun.dev">
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

      <div className="absolute right-4 top-0 flex items-center h-full">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsHidden(true)}
          title="Hide banner"
        >
          <X className="w-4" />
        </Button>
      </div>
    </div>
  );
};

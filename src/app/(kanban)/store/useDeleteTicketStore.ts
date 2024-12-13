import { create } from 'zustand';

type Store = {
  ticketToDelete: string;
  setTicketToDelete: (id: Store['ticketToDelete']) => void;
};
export const useDeleteTicketStore = create<Store>((set) => ({
  ticketToDelete: '',
  setTicketToDelete: (id) => set({ ticketToDelete: id }),
}));

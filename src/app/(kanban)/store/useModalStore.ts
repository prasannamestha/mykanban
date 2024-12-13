import { create } from 'zustand';

type SupportedModalIds = 'create-new-ticket' | 'edit-column-modal';
type ModalStore = {
  activeModalId?: SupportedModalIds;
  metadata?: Record<string, string>;

  openModal: (
    modalId: ModalStore['activeModalId'],
    metadata: ModalStore['metadata']
  ) => void;
  reset: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  activeModalId: undefined,
  openModal: (modalId, metadata) => set({ activeModalId: modalId, metadata }),
  reset: () => set({ activeModalId: undefined, metadata: undefined }),
}));

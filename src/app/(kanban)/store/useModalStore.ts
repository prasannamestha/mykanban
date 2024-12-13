import { create } from 'zustand';
import { EDIT_COLUMN_MODAL } from '../Modals/EditColumnModal';
import { NEW_COLUMN_MODAL } from '../Modals/NewColumnModal';
import { EDIT_TICKET_MODAL_ID } from '../Modals/EditTicketModal';

type SupportedModalIds =
  | 'create-new-ticket'
  | typeof EDIT_TICKET_MODAL_ID
  | typeof EDIT_COLUMN_MODAL
  | typeof NEW_COLUMN_MODAL;
type ModalStore = {
  activeModalId?: SupportedModalIds;
  metadata?: Record<string, string>;

  openModal: (
    modalId: ModalStore['activeModalId'],
    metadata?: ModalStore['metadata']
  ) => void;
  reset: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  activeModalId: undefined,
  openModal: (modalId, metadata) => set({ activeModalId: modalId, metadata }),
  reset: () => set({ activeModalId: undefined, metadata: undefined }),
}));

// store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      isVisibleChatOptions: false,
      toggleVisibilityChatOptions: () =>
        set((state) => ({ isVisibleChatOptions: !state.isVisibleChatOptions })),

      isVisibleChat: true,
      toggleVisibilityChat: () =>
        set((state) => ({ isVisibleChat: !state.isVisibleChat })),
    }),
    {
      name: "chat-widget-storage",
      partialize: (state) => ({
        isVisibleChatOptions: state.isVisibleChatOptions,
        isVisibleChat: state.isVisibleChat,
      }),
    }
  )
);

export default useStore;

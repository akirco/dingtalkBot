import { defineStore } from "pinia";

export const useModalStore = defineStore({
  id: "modal",
  state: () => ({
    isOpen: false,
  }),
  getters: {
    openProp: (state) => state.isOpen,
  },
  actions: {
    openModal() {
      this.isOpen = true;
      setTimeout(() => {
        this.isOpen = false;
      }, 3000);
    },
  },
});

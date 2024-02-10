import { create } from "zustand";

type State = {
  visible: boolean;
  layout: string | null;
  data: { [key: string]: unknown } | null;
};

type Action = {
  hide: () => void;
  show: (input: {
    layout: string;
    data: { [key: string]: unknown } | null;
  }) => void;
};

export const modalContext = create<State & Action>((set) => ({
  visible: false,
  layout: null,
  data: null,
  hide: () => set({ visible: false, layout: null, data: null }),
  show: (input: {
    layout: string | null;
    data: { [key: string]: unknown } | null;
  }) =>
    set(() => ({
      visible: true,
      layout: input.layout,
      data: input.data,
    })),
}));
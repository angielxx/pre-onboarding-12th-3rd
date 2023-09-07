import { DataType } from '@/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  data: DataType;
  isLoading: boolean;
  error: Error | null;

  setState: (newState: State) => void;

  setIsLoading: (value: boolean) => void;
  setError: (error: Error | null) => void;
  setData: (data: DataType) => void;
};

const useFetchStore = create<State>()(
  devtools((set, get) => ({
    data: [],
    isLoading: false,
    error: null,

    setState: newState => set({ ...get(), ...newState }),

    setIsLoading: isLoading => set({ ...get(), isLoading }),
    setError: error => set({ ...get(), error }),
    setData: data => set({ ...get(), data }),
  })),
);

export default useFetchStore;

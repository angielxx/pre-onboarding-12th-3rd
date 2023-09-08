import { KeywordItem } from '@/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  keyword: string;
  selectedId: number;
  maxId: number;
  keywordsList: string[] | KeywordItem[];
  isShowList: boolean;

  setState: (newState: State) => void;

  setIsShowList: (isShowList: boolean) => void;

  setKeyword: (keyword: string) => void;
  setSelectedId: (selectedId: number) => void;
  setMaxId: (maxId: number) => void;
  setKeywordsList: (keywordsList: string[] | KeywordItem[]) => void;
};

const useKeywordStore = create<State>()(
  devtools((set, get) => ({
    isShowList: false,

    keyword: '',
    selectedId: -1,
    maxId: -1,
    keywordsList: [],

    setState: newState => set({ ...get(), ...newState }),

    setIsShowList: isShowList => set({ ...get(), isShowList }),

    setKeyword: keyword => set({ ...get(), keyword }),
    setSelectedId: selectedId => set({ ...get(), selectedId }),
    setMaxId: maxId => set({ ...get(), maxId }),
    setKeywordsList: keywordsList => set({ ...get(), keywordsList }),
  })),
);

export default useKeywordStore;

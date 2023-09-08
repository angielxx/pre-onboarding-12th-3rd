import { KeywordItem } from '@/types';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

type State = {
  isShowList: boolean;
  isKeyDown: boolean;

  keyword: string;
  inputValue: string;

  selectedId: number;
  maxId: number;
  keywordsList: string[] | KeywordItem[];

  setState: (newState: State) => void;

  setIsShowList: (isShowList: boolean) => void;
  setIsKeyDown: (isKeyDown: boolean) => void;

  setKeyword: (keyword: string) => void;
  setInputValue: (inputValue: string) => void;

  setSelectedId: (selectedId: number) => void;
  setMaxId: (maxId: number) => void;
  setKeywordsList: (keywordsList: string[] | KeywordItem[]) => void;
};

const useKeywordStore = create<State>()(
  devtools((set, get) => ({
    isShowList: false,
    isKeyDown: false,

    keyword: '',
    inputValue: '',

    selectedId: -1,
    maxId: -1,
    keywordsList: [],

    setState: newState => set({ ...get(), ...newState }),

    setIsShowList: isShowList => set({ ...get(), isShowList }),
    setIsKeyDown: isKeyDown => set({ ...get(), isKeyDown }),

    setKeyword: keyword => set({ ...get(), keyword }),
    setInputValue: inputValue => set({ ...get(), inputValue }),

    setSelectedId: selectedId => set({ ...get(), selectedId }),
    setMaxId: maxId => set({ ...get(), maxId }),
    setKeywordsList: keywordsList => set({ ...get(), keywordsList }),
  })),
);

export default useKeywordStore;

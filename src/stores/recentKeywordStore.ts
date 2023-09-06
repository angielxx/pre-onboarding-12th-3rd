import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type State = {
  recentKeywords: string[];
};

const useRecentKeywordStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        recentKeywords: [],

        addKeyword: (keyword: string) => {
          let updatedKeywords = [...get().recentKeywords, keyword];

          if (updatedKeywords.length > 10) {
            updatedKeywords = updatedKeywords.slice(updatedKeywords.length - 10);
          }

          set({ recentKeywords: updatedKeywords });
        },
      }),
      { name: 'recentKeywordStore' },
    ),
  ),
);

export default useRecentKeywordStore;

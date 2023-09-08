import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type State = {
  recentKeywords: string[];
  addKeyword: (keyword: string) => void;
};

const useRecentKeywordStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        recentKeywords: [],

        addKeyword: (keyword: string) => {
          let currentRecentList = get().recentKeywords;

          if (currentRecentList.includes(keyword)) {
            const idx = currentRecentList.indexOf(keyword);
            currentRecentList = [
              ...currentRecentList.slice(0, idx),
              ...currentRecentList.slice(idx + 1),
            ];
          }
          let updatedKeywords = [keyword, ...currentRecentList];

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

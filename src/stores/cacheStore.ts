import { DataType } from '@/types';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type CacheEntry = {
  data: DataType;
  due: number;
};

type State = {
  cache: Record<string, CacheEntry>;
  setCache: (key: string, data: DataType, expireTime?: number) => void;
  findCache: (key: string) => DataType | undefined;
};

export const DEFAULT_EXPIRE_TIME = 1000 * 60 * 60;

const useCacheStore = create<State>()(
  devtools(
    persist(
      (set, get) => ({
        cache: {},

        setCache: (key, data, expireTime = DEFAULT_EXPIRE_TIME): void => {
          const due = Date.now() + expireTime;
          set(state => ({ cache: { ...state.cache, [key]: { data, due } } }));
        },

        findCache: key => {
          const cacheData = get().cache[key];
          if (cacheData) {
            const hasExpired = cacheData.due < Date.now();
            if (hasExpired) return undefined;
            return cacheData.data;
          } else {
            return undefined;
          }
        },
      }),
      { name: 'cacheStore' },
    ),
  ),
);

export default useCacheStore;

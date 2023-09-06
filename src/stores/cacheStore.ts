import { create } from 'zustand';

type CacheEntry<D> = {
  data: D;
  due: number;
};

type State<D = unknown> = {
  cache: {
    [key: string]: CacheEntry<D>;
  };
  setCache: (key: string, data: D, expireTime?: number) => void;
  findCache: (key: string) => D | undefined;
};

const DEFAULT_EXPIRE_TIME = 1000 * 60 * 60;

const cacheStore = create<State>((set, get) => ({
  cache: {},

  setCache: (key, data, expireTime = DEFAULT_EXPIRE_TIME): void => {
    const due = Date.now() + expireTime;
    set(state => ({ cache: { ...state.cache, [key]: { data, due } } }));
  },

  findCache: key => {
    const entry = get().cache[key];
    if (entry && entry.due > Date.now()) {
      return entry.data;
    } else {
      return undefined;
    }
  },
}));

export default cacheStore;

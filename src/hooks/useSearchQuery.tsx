import { useEffect } from 'react';

import { searchByKeyword } from '@/apis/search';
import useCacheStore from '@/stores/cacheStore';
import useFetchStore from '@/stores/fetchStore';
import useKeywordStore from '@/stores/keywordStore';
import useDebounce from './useDebounce';

export const useSearchQuery = () => {
  const { setCache, findCache } = useCacheStore(state => state);

  const { keyword, isKeyDown } = useKeywordStore(state => state);

  const { setIsLoading, setData, isLoading } = useFetchStore(state => state);

  const debouncedKeyword = useDebounce(keyword, 300);

  useEffect(() => {
    const fetchData = async (text: string) => {
      if (isLoading) return;
      if (isKeyDown) return;

      try {
        setIsLoading(true);
        let { data } = await searchByKeyword(text);
        data = data.slice(0, 7);
        setData(data);
        setCache(text, data);
      } catch (err) {
        // setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isKeyDown) return;
    if (debouncedKeyword === '') return;

    const cacheResult = findCache(debouncedKeyword);

    if (cacheResult) {
      setData(cacheResult);
    } else {
      if (!debouncedKeyword) return;
      fetchData(debouncedKeyword);
    }
  }, [isKeyDown, debouncedKeyword]);

  return;
};

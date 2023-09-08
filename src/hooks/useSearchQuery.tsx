import { useCallback, useEffect } from 'react';

import { searchByKeyword } from '@/apis/search';
import useCacheStore from '@/stores/cacheStore';
import useFetchStore from '@/stores/fetchStore';
import useKeywordStore from '@/stores/keywordStore';

export const useSearchQuery = () => {
  const { setCache, findCache } = useCacheStore(state => state);

  const { keyword, isKeyDown } = useKeywordStore(state => state);

  const { setIsLoading, setData } = useFetchStore(state => state);

  const fetchData = useCallback(
    async (keyword: string) => {
      if (isKeyDown) return;

      try {
        setIsLoading(true);
        const { data } = await searchByKeyword(keyword);
        setData(data);
        setCache(keyword, data);
      } catch (err) {
        // setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [isKeyDown, setCache, setData, setIsLoading],
  );

  useEffect(() => {
    if (isKeyDown) return;
    if (keyword === '') return;

    const cacheResult = findCache(keyword);

    if (cacheResult) {
      setData(cacheResult);
    } else {
      fetchData(keyword);
    }
  }, [isKeyDown, keyword, fetchData, findCache, setData]);

  return;
};

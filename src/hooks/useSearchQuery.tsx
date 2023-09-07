import { useCallback, useEffect } from 'react';

import { searchByKeyword } from '@/apis/search';
import useCacheStore from '@/stores/cacheStore';
import useFetchStore from '@/stores/fetchStore';

export const useSearchQuery = (keyword: string, expireTime?: number) => {
  const { setCache, findCache } = useCacheStore(state => state);

  const { setIsLoading, setData, setError } = useFetchStore(state => state);

  const fetchData = useCallback(
    async (keyword: string) => {
      try {
        setIsLoading(true);
        const { data } = await searchByKeyword(keyword);
        setData(data);
        setCache(keyword, data, expireTime);
      } catch (err) {
        // setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [expireTime, setCache, setData, setIsLoading],
  );

  useEffect(() => {
    if (keyword === '') return;

    const cacheResult = findCache(keyword);

    if (cacheResult) {
      setData(cacheResult);
    } else {
      fetchData(keyword);
    }
  }, [keyword, fetchData, findCache, setData]);

  return;
};

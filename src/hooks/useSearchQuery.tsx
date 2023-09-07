import { useCallback, useEffect, useState } from 'react';

import { searchByKeyword } from '@/apis/search';
import { DataType } from '@/types';
import useCacheStore from '@/stores/cacheStore';
import useRecentKeywordStore from '@/stores/recentKeywordStore';

export const useSearchQuery = (keyword: string, expireTime?: number) => {
  const { setCache, findCache } = useCacheStore(state => state);

  const addKeyword = useRecentKeywordStore(state => state.addKeyword);

  const [data, setData] = useState<DataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async (keyword: string) => {
    try {
      setIsLoading(true);
      const { data } = await searchByKeyword(keyword);
      setData(data);
      setCache(keyword, data, expireTime);
      addKeyword(keyword);
    } catch (err) {
      // throw
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (keyword === '') return;

    const cacheResult = findCache(keyword);

    // cache hit
    if (cacheResult) {
      setData(cacheResult);
    } else {
      refetch(keyword);
    }
  }, [keyword, refetch]);

  return { data, isLoading, error };
};

import { useCallback, useEffect, useState } from 'react';

import { searchByKeyword } from '@/apis/search';
import { DataType } from '@/types';
import useCacheStore from '@/stores/cacheStore';

export const useSearchQuery = (keyword: string, expireTime?: number) => {
  const { cache, setCache, findCache } = useCacheStore(state => state);

  const [data, setData] = useState<DataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async (keyword: string) => {
    try {
      setIsLoading(true);
      await searchByKeyword(keyword);
    } catch (err) {
      // throw
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
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

import { useEffect } from 'react';

import { searchByKeyword } from '@/apis/search';
import useCacheStore from '@/stores/cacheStore';
import useFetchStore from '@/stores/fetchStore';
import useKeywordStore from '@/stores/keywordStore';
import useDebounce from './useDebounce';

export const useSearchQuery = () => {
  const { setCache, findCache } = useCacheStore(state => state);

  const { keyword, isKeyDown } = useKeywordStore(state => state);

  const { setIsLoading, setData } = useFetchStore(state => state);

  const debouncedKeyword = useDebounce(keyword, 300);

  useEffect(() => {
    const fetchData = async (text: string) => {
      if (isKeyDown) return;

      try {
        setIsLoading(true);
        const { data } = await searchByKeyword(text);
        setData(data);
        setCache(text, data);
      } catch (err) {
        // setError(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isKeyDown) return;
    if (keyword === '') return;

    const cacheResult = findCache(keyword);

    if (cacheResult) {
      setData(cacheResult);
    } else {
      fetchData(debouncedKeyword);
    }
  }, [isKeyDown, keyword, debouncedKeyword]);

  return;
};

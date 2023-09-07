import { useEffect } from 'react';
import { styled } from 'styled-components';

import { RecommendedKeywordsList } from './RecommendedKeywordsList';
import { RecentKeywordsList } from './RecentKeywordsList';

import useRecentKeywordStore from '@/stores/recentKeywordStore';
import useFetchStore from '@/stores/fetchStore';
import useKeywordStore from '@/stores/keywordStore';

export const KeywordsList = () => {
  const { keyword, setMaxId } = useKeywordStore();

  const { recentKeywords } = useRecentKeywordStore(state => state);

  const { data } = useFetchStore(state => state);

  const list_type = keyword === '' ? 'recent' : 'recommended';

  useEffect(() => {
    if (list_type === 'recent') {
      setMaxId(recentKeywords.length);
    }
    if (list_type === 'recommended') {
      setMaxId(data.length);
    }
  }, [data.length, recentKeywords.length, list_type, setMaxId]);

  return (
    <>
      {list_type === 'recent' && <RecentKeywordsList />}
      {list_type === 'recommended' && <RecommendedKeywordsList />}
    </>
  );
};

export const KeywordsListContainer = styled.div`
  background-color: white;
  padding: 12px;
  height: 200px;
  width: 100%;
  overflow: scroll;
  overflow-x: hidden;
  position: absolute;
  box-sizing: border-box;
  margin-top: 8px;
  border-radius: 4px;

  p {
    margin-bottom: 8px;
  }
`;

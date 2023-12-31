import { useEffect } from 'react';
import { styled } from 'styled-components';

import { RecommendedKeywordsList } from './RecommendedKeywordsList';
import { RecentKeywordsList } from './RecentKeywordsList';

import useRecentKeywordStore from '@/stores/recentKeywordStore';
import useFetchStore from '@/stores/fetchStore';
import useKeywordStore from '@/stores/keywordStore';

export const KeywordsList = () => {
  const { inputValue, setKeywordsList } = useKeywordStore();

  const { recentKeywords } = useRecentKeywordStore(state => state);

  const { data } = useFetchStore(state => state);

  const list_type = inputValue ? 'recommended' : 'recent';

  useEffect(() => {
    if (list_type === 'recent') {
      setKeywordsList(recentKeywords);
    }
    if (list_type === 'recommended') {
      setKeywordsList(data);
    }
  }, [data, recentKeywords, list_type, setKeywordsList]);

  return (
    <>
      {list_type === 'recent' && <RecentKeywordsList />}
      {list_type === 'recommended' && <RecommendedKeywordsList />}
    </>
  );
};

export const KeywordsListContainer = styled.div`
  background-color: white;
  padding: 24px 0 24px 0;
  width: 100%;
  overflow-x: hidden;
  position: absolute;
  box-sizing: border-box;
  margin-top: 8px;
  border-radius: 24px;

  .title {
    margin-left: 24px;
    margin-bottom: 24px;
    margin-top: 24px;
    font-size: 14px;
    color: ${({ theme }) => theme.color.grey600};
  }

  .empty {
    margin-left: 24px;
    color: ${({ theme }) => theme.color.grey400};
  }

  .loading,
  .error {
    text-align: center;
    margin-left: 24px;
    margin-bottom: 24px;
    margin-top: 24px;
    font-size: 14px;
    color: ${({ theme }) => theme.color.primaryLight};
  }

  .error {
    color: ${({ theme }) => theme.color.primary};
  }
`;

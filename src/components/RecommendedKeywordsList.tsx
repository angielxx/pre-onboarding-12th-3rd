import { KeywordsListContainer } from './KeywordsList';
import { KeywordListItem } from './KeywordListItem';
import useKeywordStore from '@/stores/keywordStore';
import useFetchStore from '@/stores/fetchStore';

export const RecommendedKeywordsList = () => {
  const { keyword, selectedId } = useKeywordStore();

  const { data, isLoading, error } = useFetchStore(state => state);

  return (
    <KeywordsListContainer>
      <KeywordListItem keyword={keyword} key={-1} isSelected={selectedId == -1} />
      <p>추천 검색어</p>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error</p>}
      {data.length === 0 && <p>추천 검색어가 없습니다.</p>}
      {!isLoading &&
        data?.map(({ sickCd, sickNm }, idx) => (
          <KeywordListItem key={sickCd} keyword={sickNm} isSelected={idx == selectedId} />
        ))}
    </KeywordsListContainer>
  );
};

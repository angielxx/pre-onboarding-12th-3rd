import { KeywordsListContainer } from './KeywordsList';
import { KeywordListItem } from './KeywordListItem';
import useKeywordStore from '@/stores/keywordStore';
import useFetchStore from '@/stores/fetchStore';

export const RecommendedKeywordsList = () => {
  const { inputValue, selectedId } = useKeywordStore();

  const { data, isLoading, error } = useFetchStore(state => state);

  return (
    <KeywordsListContainer>
      <KeywordListItem keyword={inputValue} key={-1} isSelected={selectedId == -1} />
      {isLoading && <p className="loading">Loading...</p>}
      {error && <p className="error">잠시 후 다시 시도해주세요.</p>}
      {!isLoading && data.length === 0 && (
        <>
          <p className="title">추천 검색어</p>
          <p className="empty">추천 검색어가 없습니다.</p>
        </>
      )}
      {!isLoading && data.length > 0 && (
        <>
          <p className="title">추천 검색어</p>
          {data?.map(({ sickCd, sickNm }, idx) => (
            <KeywordListItem
              key={sickCd}
              keyword={sickNm}
              isSelected={idx == selectedId}
              index={idx}
            />
          ))}
        </>
      )}
    </KeywordsListContainer>
  );
};

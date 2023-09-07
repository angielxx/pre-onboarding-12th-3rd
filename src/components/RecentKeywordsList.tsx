import useRecentKeywordStore from '@/stores/recentKeywordStore';
import { KeywordsListContainer } from './KeywordsList';
import { KeywordListItem } from './KeywordListItem';
import useKeywordStore from '@/stores/keywordStore';

export const RecentKeywordsList = () => {
  const { recentKeywords } = useRecentKeywordStore(state => state);

  const { selectedId } = useKeywordStore();

  return (
    <KeywordsListContainer>
      <p>최근 검색어</p>
      {recentKeywords.length === 0 && <p>최근 검색어가 없습니다.</p>}
      {recentKeywords &&
        recentKeywords.map((recentKeyword, idx) => (
          <KeywordListItem key={idx} keyword={recentKeyword} isSelected={idx == selectedId} />
        ))}
    </KeywordsListContainer>
  );
};
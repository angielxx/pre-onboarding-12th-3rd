import { useSearchQuery } from '@/hooks/useSearchQuery';
import useRecentKeywordStore from '@/stores/recentKeywordStore';
import { KeywordListItem } from './KeywordListItem';
import { styled } from 'styled-components';
import { useKeyboardEvent } from '@/hooks/useKeyboardEvent';
import { useEffect, useState } from 'react';

interface Props {
  keyword: string;
}

export const KeywordsResult = ({ keyword }: Props) => {
  const { data, isLoading, error } = useSearchQuery(keyword);

  const { recentKeywords } = useRecentKeywordStore(state => state);

  const [maxId, setMaxId] = useState<number>(-1);

  const { selectedId } = useKeyboardEvent(maxId);

  useEffect(() => {
    if (keyword === '') {
      setMaxId(recentKeywords.length);
    } else if (data !== null) {
      setMaxId(data.length);
    } else {
      setMaxId(-1);
    }
    console.log(selectedId);
  }, [data, keyword, recentKeywords.length, selectedId]);

  if (keyword === '') {
    return (
      <Container>
        <p>최근 검색어</p>
        {recentKeywords.length === 0 && <p>최근 검색어가 없습니다.</p>}
        {recentKeywords &&
          recentKeywords.map((keyword, idx) => (
            <KeywordListItem key={idx} keyword={keyword} isSelected={idx == selectedId} />
          ))}
      </Container>
    );
  }

  return (
    <Container>
      <KeywordListItem keyword={keyword} key={-1} isSelected={-1 == selectedId} />
      <p>추천 검색어</p>
      {isLoading && <p>loading...</p>}
      {!isLoading &&
        data?.map(({ sickCd, sickNm }, idx) => (
          <KeywordListItem key={sickCd} keyword={sickNm} isSelected={idx == selectedId} id={idx} />
        ))}
    </Container>
  );
};

const Container = styled.div`
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

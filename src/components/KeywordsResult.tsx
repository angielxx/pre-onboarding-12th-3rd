import { useSearchQuery } from '@/hooks/useSearchQuery';

interface Props {
  keyword: string;
}

export const KeywordsResult = ({ keyword }: Props) => {
  const { data, isLoading, error } = useSearchQuery(keyword);

  if (keyword === '') {
    return <p>최근 검색어</p>;
  }

  return (
    <div>
      <p>추천 검색어</p>
      {isLoading && <p>loading...</p>}
      {!isLoading && data?.map(item => <p key={item.sickCd}>{item.sickNm}</p>)}
    </div>
  );
};

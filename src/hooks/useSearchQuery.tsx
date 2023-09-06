import { useState } from 'react';

interface Props {
  keyword: string;
}

export const useSearchQuery = ({ keyword }: Props) => {
  const [searchResult, setSearchResult] = useState(null);
  return;
};

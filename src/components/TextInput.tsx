import { useKeyboardEvent } from '@/hooks/useKeyboardEvent';
import { useSearchQuery } from '@/hooks/useSearchQuery';
import useKeywordStore from '@/stores/keywordStore';
import useRecentKeywordStore from '@/stores/recentKeywordStore';
import { ChangeEvent } from 'react';

interface Props {
  placeholder: string;
  showKeywordsList: () => void;
  id: string;
}

export const TextInput = ({ placeholder, showKeywordsList, id, ...rest }: Props) => {
  const { addKeyword } = useRecentKeywordStore(state => state);

  const { keyword, setKeyword, setSelectedId } = useKeywordStore(state => state);

  useKeyboardEvent(searchOnSubmit);

  useSearchQuery(keyword);

  const keywordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setSelectedId(-1);
  };

  function searchOnSubmit() {
    // api request and navigate
    if (keyword === '') return;
    addKeyword(keyword);
    setKeyword('');
  }

  return (
    <input
      type="text"
      placeholder={placeholder}
      value={keyword}
      onChange={keywordOnChange}
      onFocus={showKeywordsList}
      autoFocus
      id={id}
      {...rest}
    />
  );
};

import { useSearchQuery } from '@/hooks/useSearchQuery';
import useKeywordStore from '@/stores/keywordStore';
import useRecentKeywordStore from '@/stores/recentKeywordStore';
import { KeywordItem } from '@/types';

import { ChangeEvent, KeyboardEvent, useEffect, useRef } from 'react';
import { styled } from 'styled-components';

export const TextInput = ({ ...rest }) => {
  const {
    keyword,
    inputValue,
    selectedId,
    keywordsList,
    setKeyword,
    setInputValue,
    setIsKeyDown,
    setSelectedId,
    setIsShowList,
  } = useKeywordStore(state => state);

  const inputRef = useRef<null | HTMLInputElement>(null);

  const { addKeyword } = useRecentKeywordStore(state => state);

  useSearchQuery();

  const keywordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setIsKeyDown(false);
    setInputValue(value);
    setKeyword(value);
    setSelectedId(-1);
    setIsShowList(true);
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;

    const { key } = event;

    if (key === 'ArrowUp') {
      event.preventDefault();
      setIsKeyDown(true);
      setSelectedId(Math.max(selectedId - 1, -1));
    } else if (key === 'ArrowDown') {
      event.preventDefault();
      setIsKeyDown(true);
      setSelectedId(Math.min(selectedId + 1, keywordsList.length - 1));
    } else if (key === 'Enter' && keyword.trim()) {
      event.preventDefault();
      addKeyword(keyword);
      setIsKeyDown(false);
      setIsShowList(false);
      setKeyword('');
      await setInputValue('');
      setSelectedId(-1);
      inputRef.current?.blur();
    }
  };

  const onBlurHandler = () => {
    setSelectedId(-1);
    setIsShowList(false);
    setKeyword(inputValue);
  };

  function isKeywordItemArray(array: string[] | KeywordItem[]): array is KeywordItem[] {
    return array.length > 0 && typeof array[0] !== 'string';
  }

  useEffect(() => {
    if (selectedId == -1) return;

    let selectedKeyword: string;
    if (isKeywordItemArray(keywordsList)) {
      selectedKeyword = keywordsList[selectedId].sickNm;
    } else {
      selectedKeyword = keywordsList[selectedId];
    }
    setKeyword(selectedKeyword);
  }, [selectedId, keywordsList, inputValue, keyword, setKeyword]);

  return (
    <StyledInput
      ref={inputRef}
      type="text"
      value={keyword}
      onChange={keywordOnChange}
      onFocus={() => setIsShowList(true)}
      onBlur={onBlurHandler}
      onKeyDown={handleKeyDown}
      autoComplete="off"
      {...rest}
    />
  );
};

const StyledInput = styled.input`
  border: none;
  outline: none;
  width: calc(100% - 56px);
  height: fit-content;
  background-color: transparent;
  font-size: 16px;
  color: ${({ theme }) => theme.color.fontPrimary};

  &::placeholder {
    color: ${({ theme }) => theme.color.grey200};
  }
`;

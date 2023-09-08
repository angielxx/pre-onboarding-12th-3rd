import { useSearchQuery } from '@/hooks/useSearchQuery';
import useKeywordStore from '@/stores/keywordStore';
import { ChangeEvent } from 'react';
import { styled } from 'styled-components';

export const TextInput = ({ ...rest }) => {
  const { keyword, setKeyword, setSelectedId, setIsShowList } = useKeywordStore(state => state);

  useSearchQuery(keyword);

  const keywordOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setSelectedId(-1);
  };

  return (
    <StyledInput
      type="text"
      value={keyword}
      onChange={keywordOnChange}
      onFocus={() => setIsShowList(true)}
      onBlur={() => setIsShowList(false)}
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

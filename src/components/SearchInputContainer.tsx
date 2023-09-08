import { SearchSubmitHandlerBtn } from './SearchSubmitBtn';
import { TextInput } from './TextInput';
import useKeywordStore from '@/stores/keywordStore';
import useRecentKeywordStore from '@/stores/recentKeywordStore';
import { styled } from 'styled-components';

export const SearchInputContainer = () => {
  const { keyword, setKeyword } = useKeywordStore(state => state);

  const { addKeyword } = useRecentKeywordStore(state => state);

  const submitInput = () => {
    // api request and navigate
    if (keyword === '') return;
    addKeyword(keyword);
    setKeyword('');
  };

  return (
    <Container>
      <TextInput placeholder="질환명을 입력해주세요." id="text-input" />
      <SearchSubmitHandlerBtn submitHandler={submitInput} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  background-color: white;
  padding: 8px 8px 8px 24px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  border-radius: 99px;
  align-items: center;

  & div:first-child {
    margin-right: 8px;
  }
`;

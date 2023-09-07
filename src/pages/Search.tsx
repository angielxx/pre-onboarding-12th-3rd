import { MouseEvent, useState } from 'react';
import { styled } from 'styled-components';

import { TextInput } from '@/components/TextInput';
import { KeywordsList } from '@/components/KeywordsList';

const Search = () => {
  const [showKeywordsList, setShowKeywordsList] = useState<boolean>(false);

  const hideKeywordsList = (e: MouseEvent) => {
    console.log(e.target, e.currentTarget);
  };

  return (
    <SearchContainer onClick={hideKeywordsList}>
      <h2>
        국내 모든 임상시험 검색하고
        <br /> 온라인으로 참여하기
      </h2>
      <TextInput
        placeholder="질환명을 입력해주세요."
        showKeywordsList={() => setShowKeywordsList(true)}
        id="text-input"
      />
      {showKeywordsList && <KeywordsList />}
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  width: 100%;
  position: relative;
  height: 100%;
  padding: 80px 0px 0px 0px;

  h2 {
    font-size: 40px;
    text-align: center;
    font-weight: 700;
    line-height: 1.6;
    margin-bottom: 40px;
  }
`;

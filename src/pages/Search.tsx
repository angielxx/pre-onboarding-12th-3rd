import { MouseEvent, useState } from 'react';
import { styled } from 'styled-components';

import { KeywordsList } from '@/components/KeywordsList';
import { SearchInputContainer } from '@/components/SearchInputContainer';
import useKeywordStore from '@/stores/keywordStore';

const Search = () => {
  // const [showKeywordsList, setShowKeywordsList] = useState<boolean>(false);

  const { isShowList, setIsShowList } = useKeywordStore(state => state);

  const hideKeywordsList = (e: MouseEvent) => {
    console.log(e.target, e.currentTarget);
  };

  return (
    <SearchContainer onClick={hideKeywordsList}>
      <h2>
        국내 모든 임상시험 검색하고
        <br /> 온라인으로 참여하기
      </h2>
      <SearchInputContainer />
      {isShowList && <KeywordsList />}
    </SearchContainer>
  );
};

export default Search;

const SearchContainer = styled.div`
  width: 500px;
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

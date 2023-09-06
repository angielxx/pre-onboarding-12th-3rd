import { ChangeEvent, useState } from 'react';

// import { useSearchQuery } from '@/hooks/useSearchQuery';
import { KeywordsResult } from '@/components/KeywordsResult';

const Home = () => {
  const [showResult, setShowResult] = useState<boolean>(false);
  const [keyword, setKeyword] = useState<string>('');
  // const { data, isLoading, error } = useSearchQuery(keyword);

  const searchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="질환명을 입력해주세요."
        onChange={searchOnChange}
        onFocus={() => setShowResult(true)}
        onBlur={() => setShowResult(false)}
      />
      {showResult && <KeywordsResult keyword={keyword} />}
    </div>
  );
};

export default Home;

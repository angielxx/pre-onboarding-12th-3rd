// import { useSearchQuery } from '@/hooks/useSearchQuery';
import { useState } from 'react';

const Home = () => {
  const [keyword, setKeyword] = useState<string | null>(null);
  // const { data, isLoading, error } = useSearchQuery(keyword);

  const searchOnChange = e => {
    setKeyword(e.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="질환명을 입력해주세요." onChange={searchOnChange} />
    </div>
  );
};

export default Home;

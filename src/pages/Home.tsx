import { search } from '@/apis/search';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    search('담낭');
  }, []);

  return (
    <div>
      <p></p>
    </div>
  );
};

export default Home;

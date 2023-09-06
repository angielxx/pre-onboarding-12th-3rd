import { search } from '@/apis/search';
import { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    search('담낭');
  }, []);

  return (
    <div>
      <input type="text" />
    </div>
  )
}

export default Home;

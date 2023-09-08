import { createBrowserRouter } from 'react-router-dom';

import Search from '@/pages/Search';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search />,
  },
]);

export default router;

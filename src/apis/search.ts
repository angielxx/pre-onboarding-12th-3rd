import { ApiClient } from './client';

const client = new ApiClient('https://pre-onboarding-12th-3rd-server.vercel.app/api');

export const searchByKeyword = (keyword: string) => {
  console.log('calling api');
  return client.get('/sick', { params: { q: keyword } });
};

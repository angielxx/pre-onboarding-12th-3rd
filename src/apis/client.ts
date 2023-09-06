import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

const getClient = (baseURL: string) => {
  return axios.create({ baseURL: baseURL });
};

class ApiClient {
  client: AxiosInstance;

  constructor(baseURL: string) {
    this.client = getClient(baseURL);
  }

  get(endPoint: string, config?: AxiosRequestConfig) {
    return this.client.get(endPoint, config);
  }
}

export { ApiClient };

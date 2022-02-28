import axios, { AxiosRequestConfig } from 'axios';
import eventEmitter from 'src/utils/eventEmitter';

export const path = (path: string) => `${process.env.API_PATH || ''}${path}`;

export const getToken = () => {
  const user = JSON.parse(localStorage.getItem('persist:root'))?.user;
  const currentUser = user && JSON.parse(user).currentUser;
  const TOKEN = currentUser?.accessToken;

  return TOKEN;
}

const createRequest = (method: 'POST' | 'GET' | 'PATCH' | 'PUT' | 'DELETE') => {
  return async (
    tail: string,
    data?: Record<string, any>,
    absolutePath?: boolean,
  ) => {
    const token = getToken();
    const url = absolutePath ? tail : path(tail);
    let response;

    const config: AxiosRequestConfig = {
      method,
      data,
      url,
    };

    if (token) { config.headers = { token }; }
    if (method === 'POST') { config.withCredentials = true; }
    if (method === 'GET') {
      delete config.data;
      config.params = data;
    }

    try {
      response = await axios(config);

      if (response?.data?.errorData?.errorFlag) {
        throw { response };
      }
    } catch (e) {
      response = e.response;

      if (e.message === 'Network Error') {
        // throw ...
      }

      if (!response) { throw e; }

      if (response?.status === 403) {
        eventEmitter.emit('logout');
      } else {
        throw e;
      }
    }

    return response;
  };
};

export const del = createRequest('DELETE');
export const get = createRequest('GET');
export const patch = createRequest('PATCH');
export const post = createRequest('POST');
export const put = createRequest('PUT');

export const actionGet = <T = Record<string, string>>(tail: string, requestData: T) => {
    return post(tail, { action: 'get', requestData });
};

export const actionSet = <T, K>(tail: string, requestData: T, payload: K) => {
    return post(tail, { action: 'set', requestData, payload });
};

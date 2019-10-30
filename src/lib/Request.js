import Axios from 'axios';
import Config from '../../config'
import RefreshInterceptor from 'axios-auth-refresh'
import Store from '../store'

const Instance = Axios.create({
  baseURL: Config.api.baseUrl
});

RefreshInterceptor(Instance, async (failedRequest) => {
  const refreshToken = Store.state.User.refreshToken;
  const userId = Store.state.User.userId;

  if (!refreshToken || !userId) {
    Promise.reject(failedRequest);
  }

  const options = {
    headers: { Authorization: `Bearer ${refreshToken}` }
  };

  const result = await Instance.get(`/users/${userId}/refresh`, options);
  if (!result || !result.data.token) {
    Promise.reject(failedRequest);
  }

  const token = result.data.token;

  Store.commit('User/setToken', token);

  failedRequest.response.config.headers.Authorization = `Bearer ${token}`;
  return Promise.resolve();
});

export default Instance;

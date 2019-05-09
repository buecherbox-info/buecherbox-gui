const Axios = require('axios');

export async function login (username, password) {
  const options = {
    auth: {
      username,
      password
    }
  };
  const result = await Axios.post('/users/auth', null, options);
  return result.data;
}

export async function register (username, password) {
  const options = {
    auth: {
      username,
      password
    }
  };
  const result = await Axios.post('/users', null, options);
  return result.data;
}

export async function getProfile (userId, token) {
  const options = {
    headers: { 'Authorization': `bearer ${token}` }
  };

  const result = await Axios.get(`/users/${userId}`, options);
  return result.data;
}

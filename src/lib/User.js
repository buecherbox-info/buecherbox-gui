import Request from './Request';

export async function login (username, password) {
  const options = {
    auth: {
      username,
      password
    }
  };
  const result = await Request.post('/users/auth', null, options);
  return result.data;
}

export async function register (email, username, password) {
  const data = {
    email,
    username,
    password
  };

  const result = await Request.post('/users', data);
  return result.data;
}

export async function getProfile (userId, token) {
  const options = {
    headers: { Authorization: `bearer ${token}` }
  };

  const result = await Request.get(`/users/${userId}`, options);
  return result.data;
}

export async function changePassword (userId, token, oldPassword, newPassword) {
  const options = {
    headers: { Authorization: `bearer ${token}` }
  };

  const data = {
    oldPassword,
    newPassword
  };

  await Request.post(`/users/${userId}/password`, data, options);
}

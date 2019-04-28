const Axios = require('axios');

export async function getBookBoxInfos () {
  const result = await Axios.get('/bookboxes');
  return result.data;
}

export async function getBookBoxInfosByUser (userId, token) {
  const options = {
    headers: { 'Authorization': `bearer ${token}` }
  };

  const result = await Axios.get(`/users/${userId}/bookboxes`, options);
  return result.data;
}

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

export async function postBookBoxInfos (userId, token, bookbox) {
  const formData = new FormData();
  formData.append('userid', userId);
  formData.append('description', bookbox.description);
  formData.append('lat', bookbox.lat);
  formData.append('lng', bookbox.lng);
  formData.append('hint', bookbox.hint);
  formData.append('location', bookbox.location);
  formData.append('file', bookbox.img);

  const options = {
    headers: {
      'content-type': 'multipart/form-data',
      'authorization': `Bearer ${token}`
    }
  };

  const result = await Axios.post('/bookboxes', formData, options);
  return result.data;
}

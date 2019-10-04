import Request from './Request';

export async function getBookBoxInfos () {
  const result = await Request.get('/bookboxes');
  return result.data;
}

export async function getBookBoxInfosByUser (userId, token) {
  const options = {
    headers: { 'Authorization': `bearer ${token}` }
  };

  const result = await Request.get(`/users/${userId}/bookboxes`, options);
  return result.data;
}

export async function getBookBoxFavoritesByUser (userId, token) {
  const options = {
    headers: { 'Authorization': `bearer ${token}` }
  };

  const result = await Request.get(`/users/${userId}/favorites`, options);
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

  const result = await Request.post('/bookboxes', formData, options);
  return result.data;
}

export async function updateBookBoxInfos (userId, token, bookbox) {
  const formData = new FormData();
  formData.append('description', bookbox.description);
  formData.append('hint', bookbox.hint);
  formData.append('file', bookbox.img);

  const options = {
    headers: {
      'content-type': 'multipart/form-data',
      'authorization': `Bearer ${token}`
    }
  };

  const result = await Request.put(`/bookboxes/${bookbox.id}`, formData, options);
  return result.data;
}

export async function addFavorite (userId, token, bookboxId) {
  const options = {
    headers: { 'Authorization': `bearer ${token}` }
  };

  const result = await Request.post(`/users/${userId}/favorites`, { bookboxId }, options);
  return result.data;
}

export async function deleteFavorite (userId, token, bookboxId) {
  const options = {
    method: 'DELETE',
    url: `/users/${userId}/favorites/${bookboxId}`,
    headers: { 'Authorization': `bearer ${token}` },
    data: {
      bookboxId
    }
  };

  await Request(options);
}

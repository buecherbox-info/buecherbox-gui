import Request from './Request';

export async function getBookBoxInfos (token) {
  const options = {
    headers: { 'Authorization': `bearer ${token}` }
  };

  const result = await Request.get('/dashboard/bookboxes', options);
  return result.data;
}

export async function getUserInfos (token) {
  const options = {
    headers: { 'Authorization': `bearer ${token}` }
  };

  const result = await Request.get('/dashboard/users', options);
  return result.data;
}

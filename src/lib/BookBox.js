const Axios = require('axios');

export async function getBookBoxInfos () {
  const result = await Axios.get('/bookboxes');
  return result.data;
}

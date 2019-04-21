const Axios = require('axios');

export async function getBookBoxInfos() {
  const result = await Axios.get('http://localhost:3000/bookboxes');
  return result.data;
}

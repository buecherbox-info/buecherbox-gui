import Axios from 'axios';
import Config from '../../config';

const Instance = Axios.create({
  baseURL: Config.api.baseUrl
});

export default Instance;

import axios from 'axios';

axios.defaults.baseURL = 'http://node-js.thddns.net:4661/';
// axios.defaults.baseURL = 'http://192.168.1.199';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;
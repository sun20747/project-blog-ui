import axios from 'axios';

// axios.defaults.baseURL = 'http://node-js.thddns.net:4661';
axios.defaults.baseURL = 'http://127.0.0.1:3000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;
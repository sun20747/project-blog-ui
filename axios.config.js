import axios from 'axios';

// axios.defaults.baseURL = 'http://node-js.thddns.net:4661';
axios.defaults.baseURL = 'http://api.wp123.online';
axios.defaults.headers.post['Content-Type'] = 'application/json';

export default axios;

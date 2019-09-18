import Axios from 'axios'

Axios.defaults.baseURL = "https://flyht-354b.restdb.io/rest/";
Axios.defaults.headers.common['x-apikey'] = "5d7fa78ffd86cb75861e2350";

export default Axios;
import axios from 'axios';
const instance = axios.create({baseURL: 'http://localhost/blog-api/'});
export default instance
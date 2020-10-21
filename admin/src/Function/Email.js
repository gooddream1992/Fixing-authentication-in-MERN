import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;
export const email_send = data => {
    return axios
    .post((server+'emailsend/register_url_send'), {
        email: data.email,
        host: data.host
    })
    .then(res => {
        return res.data;
    });
}
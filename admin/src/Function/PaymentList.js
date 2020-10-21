import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;
export const payment_get = data => {
    return axios
    .get((server+'paymentlist/all_list_get'), {
    })
    .then(res => {
        return res.data;
    });
}

export const payment_add = data => {
    return axios
    .post((server+'paymentlist/add'),{
        data
    })
    .then(res => {
        return res.data
    })
}
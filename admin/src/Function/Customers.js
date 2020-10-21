import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;
export const user_get = data => {
    return axios
    .post((server+'user/userget'), {
        id: data.id
    },
    {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    )
    .then(res => {
        return res.data
    })
}
export const all_user_get = data => {
    return axios
    .post((server+'user/all_userget'), {
        id: data.id
    },
    {
        headers: {
            'Content-Type': 'application/json',
        }
    }
    )
    .then(res => {
        return res.data
    })
}
export const user_update = data => {
    return axios
    .post((server+'user/update'), data)
    .then(res => {
        return res.data
    })
}
export const custome_update = data => {
    return axios
    .post((server+'user/custome_update/'+data.id), data)
    .then(res => {
        return res.data
    })
}
export const user_delete = data => {
    return axios
    .post((server+'user/userdelete'), {
        email: data.email
    })
    .then(res => {
        return res.data;
    })
}
import axios from 'axios'
import {server_url} from 'server_host.js';
const server = server_url;

export const user_add = data => {
    return axios
    .post((server+'admin/user/signup'), {
        user_name: data.user_name,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        password: data.password
    })
    .then(res => {
        return res.data;
    })
}
export const user_login = data => {
    return axios
    .post((server+'admin/user/login'), {
        email: data.email,
        password: data.password
    })
    .then(res => {
        return res.data;
    })
}
export const user_get = data => {
    return axios
    .post((server+'admin/user/user_get'), {
        id: data.id
    })
    .then(res => {
        return res.data
    })
}
export const user_update = data => {
    return axios
    .post((server+'admin/user/user_update'), data)
    .then(res => {
        return res.data;
    })

}
export const avatar_upload = data => {
    return axios
    .post((server+"admin/user/avatar_upload"), data.imgData)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const changepassword = data => {
    return axios
    .post((server+"admin/user/changepassword"), data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const user_all_get = data => {
    return axios
    .get((server+'admin/user/userget'), {
    })
    .then(res => {
        return res.data;
    });
}
export const user_delete = data => {
    return axios
    .post((server+'admin/user/user_delete'), {
        email: data.email
    })
    .then(res => {
        return res.data;
    })
}
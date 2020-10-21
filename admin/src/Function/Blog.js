import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;
export const blog_get = data => {
    return axios
    .get((server+'blog/blog_get/'+data.id), {
    })
    .then(res => {
        return res.data;
    });
}

export const blog_add = data => {
    return axios
    .post((server+'admin/blog/add'),{
        data
    })
    .then(res => {
        return res.data
    })
}

export const blog_background_upload = data => {
    return axios
    .post((server+"admin/blog/blog_background_upload"), data.imgData)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
} 
export const blog_update = data => {
    return axios
    .post((server+"admin/blog/blog_update/"+data.id), data.data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const blog_delete = data => {
    return axios
    .post((server+"admin/blog/blog_delete"), data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
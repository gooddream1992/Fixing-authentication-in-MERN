import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;
export const event_get = data => {
    return axios
    .get((server+'event/event_get/'+data.id), {
    })
    .then(res => {
        return res.data;
    });
}
export const event_background_upload = data => {
    return axios
    .post((server+"admin/event/event_background_upload"), data.imgData)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const event_add  = data => {
    return axios
    .post((server+"admin/event/add"), {
        title: data.title,
        description: data.description,
        start_date: data.start_date,
        pay_type: data.pay_type,
        venue: data.venue,
        background_img: data.background_img,
        video_url: data.video_url
    })
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err);
    })
}

export const event_update = data => {
    return axios
    .post((server+"admin/event/event_update/"+data.id), data.data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const course_video_upload = data => {
    return axios
    .post((server+"admin/course/course_video_upload"), data.videoData)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const event_delete = data => {
    return axios
    .post((server+"admin/event/event_delete"), data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
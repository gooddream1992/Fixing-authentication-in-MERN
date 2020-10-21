import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;
export const lecture_get = data => {
    return axios
    .get((server+'admin/lecture/lecture_get/'+data.course+"/"+data.id), {
    })
    .then(res => {
        return res.data;
    });
}
export const lecture_logo_upload = data => {
    return axios
    .post((server+"admin/lecture/lecture_logo_upload"), data.imgData)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const lecture_add  = data => {
    return axios
    .post((server+"admin/lecture/add"), {
        course_id: data.course_id,
        course_name: data.course_name,
        title: data.title,
        release_date: data.release_date,
        deadline: data.deadline,
        weightage: data.weightage,
        lecture_icon: data.lecture_icon,
        free_type: data.free_type,
        color: data.color,
        level_number: data.level_number,
        order_number: data.order_number
    })
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err);
    })
}

export const lecture_update = data => {
    return axios
    .post((server+"admin/lecture/lecture_update/"+data.id), data.data)
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
export const lecture_delete = data => {
    return axios
    .post((server+"admin/lecture/lecture_delete"), data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;
export const course_get = data => {
    return axios
    .get((server+'course/course_get/'+data.id), {
    })
    .then(res => {
        return res.data;
    });
}
export const course_logo_upload = data => {
    return axios
    .post((server+"admin/course/course_logo_upload"), data.imgData)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const course_add  = data => {
    return axios
    .post((server+"admin/course/add"), {
        title: data.title,
        description: data.description,
        intro_video_id: data.intro_video_id,
        reivew_video_id: data.reivew_video_id,
        image: data.image,
        remain_days: data.remain_days,
        price: data.price,
        level_number: data.level_number
    })
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err);
    })
}
export const course_update = data => {
    return axios
    .post((server+"admin/course/course_update/"+data.id), data.data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const course_delete = data => {
    return axios
    .post((server+"admin/course/course_delete"), data)
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
export const course_batch_file = data => {
    return axios
    .post((server+"admin/course/course_batch_file_upload/"+data.name), data.jsonFile)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const json_file_read = data => {
    return axios
    .get((server+'course/json_file_read/'+data.filename), {
    })
    .then(res => {
        return res.data;
    });
}

export const json_file_write = data => {
    return axios
    .post((server+'course/json_file_write/'+data.filename), {
        text: data.text
    })
    .then(res => {
        return res.data;
    });
}
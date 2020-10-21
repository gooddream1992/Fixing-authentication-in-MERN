import axios from 'axios'
import {server_url} from '../server_host.js';
const server = server_url;
export const lectureitem_get = data => {
    return axios
    .get((server+'admin/lectureitem/itemget/'+data.id), {
    })
    .then(res => {
        return res.data;
    });
}
export const item_from_course = data => {
    return axios
    .get((server+'lectureitem/item_from_course/'+data.id), {
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
export const lectureitem_add  = data => {
    return axios
    .post((server+"admin/lectureitem/add"), {
        lecture_id: data.lecture_id,
        lecture_name: data.lecture_name,
        course_id: data.course_id,
        sample_input: data.sample_input,
        sample_output: data.sample_output,
        test_input: data.test_input,
        test_output: data.test_output,
        check_input: data.check_input,
        check_output: data.check_output,
        title: data.title,
        type: data.type,
        url: data.url,
        filename: data.filename,
        description: data.description,
        in_format: data.in_format,
        out_format: data.out_format,
        notes: data.notes,
        hint: data.hint,
        contain: data.contain,
        sample_code: data.sample_code,
        score: data.score
    })
    .then(res => {
        return res.data
    })
    .catch(err => {
        console.log(err);
    })
}

export const lectureitem_update = data => {
    return axios
    .post((server+"admin/lectureitem/lectureitem_update/"+data.id), data.data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const lectureitem_delete = data => {
    return axios
    .post((server+"admin/lectureitem/lectureitem_delete"), data)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
export const lectureitem_pdf_upload = data => {
    return axios
    .post((server+"admin/lectureitem/lectureitem_pdf_upload"), data.pdfData)
    .then(res => {
        return res.data;
    })
    .catch(err => {
        console.log(err);
    })
}
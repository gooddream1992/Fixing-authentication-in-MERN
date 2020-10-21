import axios from 'axios'
import {server_url} from 'server_host.js';
const server = server_url;

export const support_chat_get = data => {
    return axios
    .post((server+'supportchat/support_chat_get'), data)
    .then(res => {
        return res.data;
    })
}
export const chatroom_update = data => {
    return axios
    .post((server+'supportchat/chatroom_update'), data)
    .then(res => {
        return res.data
    })
}

export const doubte_update = data => {
    return axios
    .post((server+"supportchat/doubte_update"), data)
    .then(res => {
        return res.data;
    })
}

export const chatuser_add = data => {
    return axios
    .post((server+"supportchat/chatuser_add"), data)
    .then(res => {
        return res.data;
    })
}

export const chatuser_update = data => {
    return axios
    .post((server+"supportchat/chatuser_update"), data)
    .then(res => {
        return res.data;
    })
}

export const chatuser_delete = data => {
    return axios
    .post((server+"supportchat/chatuser_delete"), data)
    .then(res => {
        return res.data;
    })
}

export const chatuser_add_room = data => {
    return axios
    .post((server+"supportchat/chatuser_add_room"), data)
    .then(res => {
        return res.data;
    })
}

export const chatuser_remove_room = data => {
    return axios
    .post((server+"supportchat/chatuser_remove_room"), data)
    .then(res => {
        return res.data;
    })
}

export const other_admin = data => {
    return axios
    .post((server+"supportchat/other_admin"), data)
    .then(res => {
        return res.data
    })
}

export const doubte_all_update = data => {
    return axios
    .post((server+"supportchat/doubte_all_update"), data)
    .then(res => {
        return res.data
    })
}
export const message_delete = data => {
    return axios
    .post((server+'supportchat/message_delete'), data)
    .then(res => {
        return res.data
    })
}
export const chat_file_upload = data => {
    return axios
    .post((server+'supportchat/chat_file_upload'), data.file, {
        onUploadProgress: ProgressEvent => data.onProcessFuc(ProgressEvent)})
    .then(res => {
        return res.data
    })
}
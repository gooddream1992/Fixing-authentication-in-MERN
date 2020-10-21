import axios from 'axios'
import {server_url} from 'server_host.js';
const server = server_url;

export const doubte_get = data => {
    return axios
    .post((server+'doubtchat/doubte_get'), data)
    .then(res => {
        return res.data;
    })
}
export const chatroom_update = data => {
    return axios
    .post((server+'doubtchat/chatroom_update'), data)
    .then(res => {
        return res.data
    })
}

export const doubte_update = data => {
    return axios
    .post((server+"doubtchat/doubte_update"), data)
    .then(res => {
        return res.data;
    })
}

export const chatuser_add = data => {
    return axios
    .post((server+"doubtchat/chatuser_add"), data)
    .then(res => {
        return res.data;
    })
}

export const chatuser_update = data => {
    return axios
    .post((server+"doubtchat/chatuser_update"), data)
    .then(res => {
        return res.data;
    })
}

export const chatuser_delete = data => {
    return axios
    .post((server+"doubtchat/chatuser_delete"), data)
    .then(res => {
        return res.data;
    })
}

export const chatuser_add_room = data => {
    return axios
    .post((server+"doubtchat/chatuser_add_room"), data)
    .then(res => {
        return res.data;
    })
}

export const chatuser_remove_room = data => {
    return axios
    .post((server+"doubtchat/chatuser_remove_room"), data)
    .then(res => {
        return res.data;
    })
}

export const other_admin = data => {
    return axios
    .post((server+"doubtchat/other_admin"), data)
    .then(res => {
        return res.data
    })
}

export const doubte_all_update = data => {
    return axios
    .post((server+"doubtchat/doubte_all_update"), data)
    .then(res => {
        return res.data
    })
}

export const message_delete = data => {
    return axios
    .post((server+'doubtchat/message_delete'), data)
    .then(res => {
        return res.data
    })
}
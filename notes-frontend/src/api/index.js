import {axios} from 'axios'

const BASE_URL = 'http://localhost:3841/api/'

export const ENDPOINTS = {
    notes : 'Notes',
}

export const actions = {
    get: () => axios.get(BASE_URL + notes),
    post: () => axios.post(BASE_URL + notes, newRecord),
    patch: () => axios.patch(BASE_URL + notes, newRecord),
    delete: () => axios.delete(BASE_URL + notes, id)
}
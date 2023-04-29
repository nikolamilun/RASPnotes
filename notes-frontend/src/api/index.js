import axios from 'axios'

const BASE_URL = 'http://localhost:3841/api/'

const ENDPOINTS = {
    notes : 'Notes',
}

export const actions = {
    get: () => axios.get(BASE_URL + ENDPOINTS.notes),
    post: (newRecord) => axios.post(BASE_URL + ENDPOINTS.notes, newRecord),
    patch: (newRecord) => axios.patch(BASE_URL + ENDPOINTS.notes, newRecord),
    delete: (id) => axios.delete(BASE_URL + ENDPOINTS.notes, id)
}
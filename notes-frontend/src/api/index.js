import axios from 'axios'

const BASE_URL = 'http://localhost:5117/api/'

const ENDPOINTS = {
    notes : 'Notes/',
}

export const actions = {
    get: () => axios.get(BASE_URL + ENDPOINTS.notes),
    post: (newRecord) => axios.post(BASE_URL + ENDPOINTS.notes, newRecord),
    patch: (id, newRecord) => axios.put(BASE_URL + ENDPOINTS.notes + id, newRecord),
    delete: (id) => axios.delete(BASE_URL + ENDPOINTS.notes + id)
}
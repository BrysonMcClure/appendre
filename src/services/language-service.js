import axios from "axios";
//A tool which is able to do things like post and put for us, essentially form http requests for us
//which nativley we could not do programatically i think
//Will need to be an envrionment variable later
const API_BASE = 'http://localhost:4000/api'
const SECURITY_API = `${API_BASE}/session`;

const api = axios.create({
    withCredentials: true
})

export const setLanguage = async (language) => {
    const response = await api.get(`${SECURITY_API}/set/language/${language}`);
    return response.data;
}

export const getLanguage = async () => {
    const response = await api.get(`${SECURITY_API}/get/language`);
    return response.data;
}
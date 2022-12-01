import axios from "axios";
//Axios is an endpoint request hitting tool right? I think so. Since we use to it call rest type reqeusts on the api then right ummm hmmmmmmmm?
import {API_BASE} from "./api-base";
//A tool which is able to do things like post and put for us, essentially form http requests for us
//which nativley we could not do programatically i think
//Will need to be an envrionment variable later
const LANGUAGE_API = `${API_BASE}/session`;

const api = axios.create({
    withCredentials: true
})

export const setLanguage = async (language) => {
    const response = await api.get(`${LANGUAGE_API}/set/language/${language}`);
    return response.data;
}

export const getLanguage = async () => {
    const response = await api.get(`${LANGUAGE_API}/get/language`);
    return response.data;
}
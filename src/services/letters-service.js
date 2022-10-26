import axios from "axios";

const API_BASE = 'http://localhost:4000/api'
const LETTERS_API = `${API_BASE}/letters`

const api = axios.create({
    withCredentials: true
})

export const findAllLetters = async () => {
    const response = await api.get(LETTERS_API);
    return response.data;
}

export const findLettersByAttribute = async (attribute, value) => {
    const response = await api.get(`${LETTERS_API}/attribute/value`);
    //still unsure of the best way to be structuiring this type of attribute value request, maybe we should just bite the
    //bullet and define a dao case that we swtich on for each attribute we could be looking by
    //then multisearches could call multiple and then just and the results?
    //maybe thats better, have to experiment a bit with how this all gets processed/handled
    return response.data;
    //Ok, so responses just have a data property, sometimes that data is a json, sometimes its a response, but that's not for us to say here I guess.
}

export const createLetter = async (letter) => {
    const response = await api.post(LETTERS_API, letter);
    //letter as second argument means it goes in the body
    return response.data;
}

export const deleteLetter = async (letter) => {
    const response = await api.delete(`${LETTERS_API}/${letter._id}`);
    return response.data;
}

export const updateLetter = async (letter) => {
    const response = await api.put(`${LETTERS_API}/${letter._id}`, letter);
    return response.data;
}



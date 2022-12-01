import axios from "axios";
//A tool which is able to do things like post and put for us, essentially form http requests for us
//which nativley we could not do programatically i think
//Will need to be an envrionment variable later
import {API_BASE} from "./api-base";
const SECURITY_API = `${API_BASE}/auth`;

const api = axios.create({
    withCredentials: true
})

export const signup = async (user) => {
    const response = await api.post(`${SECURITY_API}/signup`, user);
    // try {
    //     response =
    // } catch (error) {
    //     alert('hi');
    //     throw("Username already in use");
    //     return;
    // }
    console.log(response.data);
    return response.data;
    //api.post(`${SECURITY_API}/signup`, user).then(response => response.data);
}

export const login = async (user) => {
    //implied return of response var, i guess not actually since we kept getting void return types
    //api.post(`${SECURITY_API}/login`, user).then(response => response.data);
    const response = await api.post(`${SECURITY_API}/login`, user);
    return response.data;

}
export const logout = async () => {
    //api.post(`${SECURITY_API}/logout`, user).then(response => response.data);
    //just dont send the body data, don't think we actually need it anyway hmmm?
    const response = await api.post(`${SECURITY_API}/logout`);
    return response.data;
}
export const profile = async () => {
    //This does not work, returns an undefined object, aka null return type I think, not exactly sure why it does not work?
    //api.post(`${SECURITY_API}/profile`).then(response => {return response.data});
    const response = await api.post(`${SECURITY_API}/profile`);
    return response.data;
}

export const checkUsernameAvailability = async (user) => {
    //api.post(`${SECURITY_API}/checkUsernameAvailability`, user).then(response => response.data);
    const response = await api.post(`${SECURITY_API}/checkUsernameAvailability`, user);
    return response.data;
}

export const getUserById = async (uid) => {
    const response = await api.get(`${SECURITY_API}/${uid}`);
    return response.data;
}

//Returns a list of users according to an attribute. To be used for search and not signin puruposes. Maybe want to make this a reducer and seperate service later. Not sure. Working on search for now.
export const findUsersByAttribute = async (attribute, value) => {
    const response = await api.get(`${SECURITY_API}?${attribute}=${value}`);
    return response.data;

}

export const updateUser = async (uid, updatedUser) => {
    console.log("updateUser in service is triggered");
    const response = await api.put(`${SECURITY_API}/update/${uid}`, updatedUser);
    console.log(response, "service response data");
    return response.data;
}

export const acceptCollaboration = async (pid, uid) => {
    //Format of pid (currently logged in user, aka profile)/ accepts/ request from uid
    const response = await api.put(`${SECURITY_API}/${pid}/acceptCollaboration/${uid}`);
    return response.data;
}

export const requestsCollaboration = async (pid, uid) => {
    const response = await api.put(`${SECURITY_API}/${pid}/requestsCollaboration/${uid}`);
    return response.data;
}

export const follow = async (pid, uid) => {
    const response = await api.put(`${SECURITY_API}/${pid}/follow/${uid}`);
    return response.data;
}

export const deleteLetter = async (pid, lid) => {
    console.log("service is off");
    const response = await api.delete(`${SECURITY_API}/${pid}/deleteLetter/${lid}`);
    console.log(response, "service level response");
    return response.data;
}

export const writeLetter = async (pid, newLetter) => {
    const response = await api.post(`${SECURITY_API}/${pid}/writeLetter`, newLetter);
    console.log(response, "write response");
    return response.data;
}

export const changePassword = async (user) => {
    const response = await api.put(`${SECURITY_API}/changePassword`, user);
    return response.data;
}

//See this is also a put request which returns something, so again totally fine given the letter just so happening to be the current target I guess right ehhh? No shade to replyies at all.
export const provideFeedback = async (pid, rid, feedback) => {
    const response = await api.put(`${SECURITY_API}/${pid}/provideFeedback/${rid}`, feedback);
    console.log(response.data, "feedback response thingy may be the issue with reducer not updating right away thingy maybe idk hmmmm? would point to a service issue but legitamatley with this its easier/ faster maybe to do it this way instead of having to relogin and restart the service then lol man. ")
    return response.data;
}

export const replyTo = async (pid, lid, reply) => {
    const response = await api.put(`${SECURITY_API}/${pid}/replyTo/${lid}`, reply);
    console.log(response.data, "reply repsonse data");
    return response.data;
}

import axios from "axios";
//A tool which is able to do things like post and put for us, essentially form http requests for us
//which nativley we could not do programatically i think
//Will need to be an envrionment variable later
const API_BASE = 'http://localhost:4000/api'
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


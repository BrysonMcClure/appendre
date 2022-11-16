import axios from "axios";
//we will come back to this.
import {API_BASE} from "./api-base";
const USERS_API = `${API_BASE}/users`;

//Deals in general with anything that is not the currenlty logged in user, since profile has to maintain parody with session, and that is not something
//this is equiped to do on the front or backend. ALso for now, this has no reducer since we really only pull and use those serach results in one palce,
//making it allowable to remain as a state variable, so yea, thats nice.

const api = axios.create({
    withCredentials: true
})

//This is cool just being a response, since again we arent updating any sort of reducer or anything here locally, and so for the time being I dont really care about
//getting back the properly poluated user.
export const updateUser = async (user) => {
    console.log(user, "what we just did before we send it off, to see if maybe its a server problem or if it's here");
    const response = await api.put(`${USERS_API}/${user._id}`, user);
    return response.data;
}

export const findUserById = async (uid) => {
    console.log("this fires");
    const response = await api.get(`${USERS_API}/${uid}`);
    console.log(response, "findBy");
    return response.data;
}
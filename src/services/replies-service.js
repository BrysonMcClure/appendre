import axios from "axios";
//importing this, working on making as few things that need to be env variables later as possible
//Maybe want to set up an enviornmetn variables file like this or something to centeralize them all, and then just import them,
//thus making it all easier if/ when we change the service? Idk, maybe, kinda sounds like a good idea maybe but for now for stuff, just a nice to have going
//forward for the future and stuff and what not.
import {API_BASE} from "./letters-service";
const REPLIES_API = `${API_BASE}/replies`;

const api = axios.create({
    //No semicolon because this is an attribute, not a function call or statement I guess so hmmmmm.
    withCredentials: true
})

//Passing whole object, not just id, we can do that part here. Will make other methods easier I guess?
export const replyToLetter = async (author, reply, parentLetter) => {
    //Author By id, replying to, letter by id, passing reply as body.
    const response = await api.post(`${REPLIES_API}/${author._id}/replyTo/${parentLetter._id}`, reply);
    return response.data;

}
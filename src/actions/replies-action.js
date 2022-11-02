import * as repliesService from "../services/replies-service"
import * as lettersAction from "../actions/letters-action"

//Why we are making an action now. So techincally we dont need an action yet and we could just call the service directly for
//creating a reply. There is precedent for this with what we do with the authentication service. How ever, I want replyToALetter
//to also add a reply, and then also add that reply to the given document we are replying to. I could put that all in to service,
//but if i had to hazard a guess I would say that in theory, a service should really just be responsible for talking to the server and
//executing the http requests. That being said, an action on the other hand can do otherthings in addtion to calling the service, be that
//updating the reducer, or in this case calling upon the letters. Service, nay the action (so reducer also gets triggered, don't wanna short circuit that i
//am just now remebering/ realizing. But still, I feel like that this is a good/ the right place to put it then. Hmmmmmm hmmmmm.

//You are "creating a reply" but unlike a letter, given its link to a letter, it could also be said to be,
//Replying to a letter.
export const REPLY_TO_LETTER = 'REPLY_TO_LETTER';

export const replyToLetter = async (dispatch, author, reply, parentLetter) => {
    const addedReply = await repliesService.replyToLetter(author, reply, parentLetter);
    //Modify, both reducer and server, by updating the parent letter with the id of the newely created/ added reply.
    parentLetter.replies.push(addedReply._id);
    const updatedLetter = await lettersAction.updateLetter(dispatch, parentLetter);
}
import * as authService from "../services/auth-service";
import {CREATE_LETTER, DELETE_LETTER, UPDATE_LETTER} from "./letters-action";
import {API_BASE} from "../services/api-base";

export const GET_PROFILE = 'GET_PROFILE';
export const LOGOUT = 'LOGOUT';

export const getProfile = async (dispatch) => {
    console.log(API_BASE, "dispatchcalled");
    const userProfile = await authService.profile();
    console.log(userProfile, "userprofile from get")
    dispatch({
        type: GET_PROFILE,
        userProfile
    });
}

export const logout = async (dispatch) => {
    //Just destroy the session, so not like we have to send an object so it can reference the id of the thing
    //To be deleted or anything right?
    const response = await authService.logout();
    dispatch({
        type: LOGOUT
    });
    return response;
}

//the logged in user
//Using this now for things like updating profile pic, and no longer for sub things
//like writing a letter, changing how we write/ maybe approach or think about those
//requests I think maybe. Not necessarily better, just different!
export const updateUser = async (dispatch, user) => {
    console.log(user, "user");
    const response = await authService.updateUser(user._id, user);
    console.log(response);
    //Since there is no concept of a local modified version of the profile like we have with
    //subset of letters an things, for parities sake we will count on the authentication controller
    //updating the session, and then we just poll the session again and update the reducer accordingly. also
    //helps deal with population stuff I believe.
    getProfile(dispatch);
    return response;
}

export const acceptCollaboration = async (dispatch, pid, uid) => {
    const response = await authService.acceptCollaboration(pid, uid);
    getProfile(dispatch);
    console.log(response, "accept Response");
    return response;
}

export const requestsCollaboration = async (dispatch, pid, uid) => {
    const response = await authService.requestsCollaboration(pid, uid);
    getProfile(dispatch);
    console.log(response, "request Response");
    return response;
}

export const follow = async (dispatch, pid, uid) => {
    const response = await authService.follow(pid, uid);
    getProfile(dispatch);
    console.log(response, "follow Response");
    return response;
}

export const deleteLetter = async (dispatch, pid, letter) => {
    console.log("I am not triggering");
    const response = await authService.deleteLetter(pid, letter._id);
    console.log("getting past this?");
    console.log(response, "deleteResponse");
    getProfile(dispatch);
    dispatch({
        type: DELETE_LETTER,
        letter
    });

    return response;
}

export const writeLetter = async (dispatch, pid, letter) => {
    const newLetter = await authService.writeLetter(pid, letter);
    console.log(newLetter, "addedLetter");
    getProfile(dispatch);
    dispatch({
        type: CREATE_LETTER,
        newLetter
    });
    //Just doing this so we can use the id for redirecting for now. Need to know which one was jsut added.
    return newLetter;
}

export const changePassword = async (dispatch, user) => {
    const response = await authService.changePassword(user);
    getProfile(dispatch);
    return response;
}

//Nothing changed because its all references, but we do need to recall and repopulate the letter so
//through the trickle down we get an updated later with the new feedback populated I think right??
export const provideFeedback = async (dispatch, pid, rid, feedback) => {
    const updatedLetter = await authService.provideFeedback(pid, rid, feedback);
    dispatch({
        type: UPDATE_LETTER,
        updatedLetter
    })
    return updatedLetter;
}

//Again, we determined this all belongs here again because of the responsibility of the auth service to authenticate
//the only person creating documents is the logged in user right ehhhhhh?
export const replyTo = async(dispatch, pid, lid, reply) => {
    const updatedLetter = await  authService.replyTo(pid, lid, reply);
    dispatch({
        type: UPDATE_LETTER,
        updatedLetter
    })
    getProfile(dispatch);
    //Also, update profile to maintain parody with session which added the new reply to the users list of replies, still on the newly found fence of whethere or not we want to
    //get rid of that reference system. It makes a lot of sense for a letter keeeping track of its replues, but should a user keep track of what they wrote in thish way or could we
    //just have an endpoitn request for that? I do believe there is precenedent in one of the tuiter examples from the assignment discussing that and ahving
    //one to many requests for just getting all this letters a user wrote for example since they are all signed with our ids anyway. Idk man, again this all gets very complex very fast.
    //I still do favor though using populate wherever possible over constantly making me responsible for polling for the details on a piece of data by using its id only,
    //feels much cleaner this way / + and like kind of one of the points why object id references exists in this way anyway maybe. hmmmmmm?
    return updatedLetter;
}

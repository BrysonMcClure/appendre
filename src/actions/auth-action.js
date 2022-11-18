import * as authService from "../services/auth-service";
import {CREATE_LETTER, DELETE_LETTER} from "./letters-action";

export const GET_PROFILE = 'GET_PROFILE';
export const LOGOUT = 'LOGOUT';

export const getProfile = async (dispatch) => {
    console.log("dispatchcalled");
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

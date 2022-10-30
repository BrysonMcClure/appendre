import * as authService from "../services/auth-service";

export const GET_PROFILE = 'GET_PROFILE';
export const LOGOUT = 'LOGOUT';

export const getProfile = async (dispatch) => {
    const userProfile = await authService.profile();
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

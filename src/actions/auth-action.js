import * as authService from "../services/auth-service";

export const GET_PROFILE = 'GET_PROFILE';

export const profile = async (dispatch) => {
    const userProfile = await authService.profile();
    dispatch({
        type: GET_PROFILE,
        userProfile
    });
}

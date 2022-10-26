import {GET_PROFILE} from "../actions/auth-action";

const profileReducer = (profile = {}, action) => {
    switch (action.type) {
        case GET_PROFILE:
            return action.userProfile;
        default:
            return profile;
    }
}
export default profileReducer;
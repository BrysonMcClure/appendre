import {GET_PROFILE, LOGOUT} from "../actions/auth-action";
import {UPDATE_USER} from "../actions/users-action";
//May not life that, need to define a default to establish type? Actually now that I think about it I guess language didnt have to do that, so maybe should be fine?
//Never mind, language did do that. Lets see.
//COnfirmed via console error, "initial state may not be undefined". I really think this is a type establishment/ dynamic assignment thing or what ever. Can use null though.
//But either way reducer must return something, in this case a default profile value, which gets returned in the default switch case which should be getting
//Triggered/ should be called everytime.
const profileReducer = (profile = {}, action) => {
    switch (action.type) {
        case GET_PROFILE:
            return action.userProfile;
        case LOGOUT:
            profile = {}
            return profile;
        default:
            return profile;
    }
}
export default profileReducer;
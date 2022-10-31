import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as authAction from "../../../actions/auth-action";
import * as authService from "../../../services/auth-service"
import PublicUserDetails from "../public-user-details";
import {useParams} from "react-router-dom";

const PublicProfile = () => {

    const languagePreference = useSelector((state) => state.lang);
    //Actually don't want to use reducer here I think, and instead may use a local state var, b/c I think this otherwise would result in competition between the header trying to load in the actuall logged in user, because here we arent
    //wanting to set the requested user as the logged in user as far as the local state parody of the reducer is concerned, but instead just want a user object that we can pass around. Profile does just return a user after all, not some special hgasognmdfs profile object after all right??
    const profile = useSelector((state) => state.profile);
    //using the currently logged in user as an example default data. should also be fine even if not logged in maybe?????
    const [searchedProfile, setProfile] = useState(profile);

    const dispatch = useDispatch();
    const params = useParams();

    useEffect(() => {
        //authAction.getProfile(dispatch);
        async function getUser () {
            const user = await authService.getUserById(params.userId);
            setProfile(user);
        }
        getUser();
        //setProfile(getUser());
    }, []);

    return (
        <div>
            {/*console.log(searchedProfile)*/}
            {searchedProfile && <PublicUserDetails profile={searchedProfile}/>}
        </div>
    )


}
export default PublicProfile;
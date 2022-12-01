import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import * as authService from "../../../services/auth-service"
import PublicUserDetails from "../public-user-details";
import {useNavigate, useParams} from "react-router-dom";
import Connection from "../../appendre/Connection";

const PublicProfile = () => {

    const languagePreference = useSelector((state) => state.lang);
    //Actually don't want to use reducer here I think, and instead may use a local state var, b/c I think this otherwise would result in competition between the header trying to load in the actuall logged in user, because here we arent
    //wanting to set the requested user as the logged in user as far as the local state parody of the reducer is concerned, but instead just want a user object that we can pass around. Profile does just return a user after all, not some special hgasognmdfs profile object after all right??
    const profile = useSelector((state) => state.profile);
    //using the currently logged in user as an example default data. should also be fine even if not logged in maybe?????
    const [searchedProfile, setProfile] = useState(profile);

    const params = useParams();

    useEffect(() => {
        //authAction.getProfile(dispatch);
        async function getUser () {
            const user = await authService.getUserById(params.userId);
            setProfile(user);
        }
        getUser();
        //setProfile(getUser());
    }, [params.userId]);
    //will this one work? idk then hmmmmmm?

    const navigate = useNavigate();

    const goToLetters = () => {
        navigate(`/appendre/search/letters-search/0/7?author=${searchedProfile.username}`);
    }

    return (
        <div>
            {/*console.log(searchedProfile)*/}
            {searchedProfile && <PublicUserDetails profile={searchedProfile} otherUser={true}/>}
            <div>
                {(profile.users && profile.users === "PenUser") &&<button type='button' className="btn btn-primary" onClick={goToLetters}>{languagePreference.viewLettersByThisPen}</button>}
            </div>
            <Connection profile={profile} user={searchedProfile}/>
        </div>
    )


}
export default PublicProfile;
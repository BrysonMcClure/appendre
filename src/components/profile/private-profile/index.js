import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as authAction from "../../../actions/auth-action";
import PrivateUserDetails from "../private-user-details";
import PublicUserDetails from "../public-user-details";

const PrivateProfile = () => {

    const languagePreference = useSelector((state) => state.lang);
    const profile = useSelector((state) => state.profile);

    const dispatch = useDispatch();

    useEffect(() => {
        authAction.getProfile(dispatch);
    }, []);

    return (
        <div>
            {profile && <PublicUserDetails profile={profile}/>}
            {/*Providing profile as an argument helps prevent repeated code in private for grabbing profile, even through there would never need to be a way to show the private details of a given user specified in args and should always just be the logged in one provided by the service, Theoreticallagamally!*/}
            {profile && <PrivateUserDetails profile={profile}/>}
        </div>
    )


}
export default PrivateProfile;
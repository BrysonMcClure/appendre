import React from "react";
import {useSelector} from "react-redux";

//All this does is render the profile given to it, should not be responsible for getting profile and or calling get, or using params,
//that should be the responsibility of public or private who is calling it/ asking it to render a profile display thingy for us.
const PublicUserDetails = ({profile}) => {

    const languagePreference = useSelector((state) => state.lang);
    //const profile = useSelector((state) => state.profile);

    return (
        <div>
            {profile && <h1>{profile.username}</h1>}
            {profile && <h2>{profile.role}</h2>}
        </div>
    )


}
export default PublicUserDetails;
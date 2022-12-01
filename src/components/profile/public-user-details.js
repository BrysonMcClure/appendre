import React from "react";
import {useSelector} from "react-redux";

//All this does is render the profile given to it, should not be responsible for getting profile and or calling get, or using params,
//that should be the responsibility of public or private who is calling it/ asking it to render a profile display thingy for us.

//a relic of sorts from when we were going to do this a different way right? ehhhh?
//, otherUser = false
const PublicUserDetails = ({profile}) => {

    const languagePreference = useSelector((state) => state.lang);
    //const profile = useSelector((state) => state.profile);


    return (
        <div className="row col-auto">
            {profile.profilePic &&
             <div className="col">
                <div className="card mb-3">
                    <h3 className="card-header">{languagePreference.profilePic}</h3>
                    {/*<svg xmlns="http://www.w3.org/2000/svg" className="d-block user-select-none"*/}
                    {/*     width="100%" height="200" aria-label="Placeholder: Image cap"*/}
                    {/*     focusable="false" role="img" preserveAspectRatio="xMidYMid slice"*/}
                    {/*     viewBox="0 0 318 180" style="font-size:1.125rem;text-anchor:middle">*/}
                    {/*    <rect width="100%" height="100%" fill="#868e96"></rect>*/}
                    {/*</svg>*/}
                    <img className="img-fluid rounded-circle" width="100%" src={profile.profilePic} alt={languagePreference.profilePic}/>
                </div>
             </div>}
            <div className="col">
                <h2>{languagePreference.username}:</h2>
                {profile && <h1>{profile.username}</h1>}
                <h2>{languagePreference.role}:</h2>
                {profile && <h2>{profile.role}</h2>}
            </div>
        </div>
    )


}
export default PublicUserDetails;
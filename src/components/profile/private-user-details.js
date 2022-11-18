import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import * as authAction from "../../actions/auth-action";
import PenDetails from "./pen-details";
import FileBase64 from 'react-file-base64';


const PrivateUserDetails = ({profile}) => {

    const languagePreference = useSelector((state) => state.lang);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logoutUser = async () => {
        //Changing this to use the action instead, now that profile is a reducer and not a local state var,
        //Just to make it explicit that we are clearing the session, instead of just redirecting and counting
        //On next login to repole session. Essentially action is just helping us to maintain parody explicitly
        //Of reducer and server status rather than counting on next load to overrite with new session data me thinks.
        const response = await authAction.logout(dispatch);
        //Nice, fixed void return type and this works now. Check mark.
        if (response === "OK") {
            navigate('/');
        }
        else {
            alert("Logout Failed, Please Try again");
        }
        console.log(response);
    }

    const updateProfilePic = async (newPhoto) => {
        const response = await authAction.updateUser(dispatch, {...profile, profilePic: newPhoto});
    }


    return (
        <div>
            <p>Update Profile Pic</p>
            <FileBase64 type ="file" multiple={false} onDone={({base64}) => updateProfilePic(base64)}/>
            <h1>Your Password was last changed on: TBD</h1>
            {profile.role === 'PEN' && <PenDetails profile={profile}/>}
            {/*console.log(profile)*/}
            <button className="btn btn-secondary" type="button" onClick={logoutUser}>{languagePreference.logout}</button>
        </div>
    )
};

//This is where we can render the different types of profile screens i'm thinking. Use this as a parent shell.
//Didnt think about that before but this would be the ideal place to render between those.

export default PrivateUserDetails;
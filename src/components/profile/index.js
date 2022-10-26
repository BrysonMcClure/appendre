import React, {useEffect, useState} from "react";
import * as authService from "../../services/auth-service"
import * as authAction from "../../actions/auth-action"
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import PenDetails from "./pen-details";

const Profile= () => {
    const languagePreference = useSelector((state) => state.lang);
    ///console.log(languagePreference);
    //totally should make this a recuder later I think.
    //const [profile, setProfile] = useState({});
    const profile = useSelector((state) => state.profile);
    const navigate = useNavigate();

    const dispatch = useDispatch();

    // const setUpProfile = () => {
    //     async function establishProfile() {
    //         //should call the action not the service in the future so again this is a reducer thing
    //         const user = await authService.profile();
    //         setProfile(user);
    //     }
    //     establishProfile();
    // }

    const logoutUser = async () => {
        const response = await authService.logout();
        //Nice, fixed void return type and this works now. Check mark.
        if (response === "OK") {
            navigate('/');
        }
        else {
            alert("Logout Failed, Please Try again");
        }
        console.log(response);
    }

    //Once on load, loading the users profile into memory for our reducer to use and render later
    useEffect(() => {authAction.profile(dispatch);});


    return (
        <div>
            <h4>{profile.username}</h4>
            <h4>Role: {profile.role}</h4>
            {profile.role === 'PEN' && <PenDetails/>}
            {/*console.log(profile)*/}
            <button className="btn btn-secondary" type="button" onClick={logoutUser}>{languagePreference.logout}</button>
        </div>
    )
};

//This is where we can render the different types of profile screens i'm thinking. Use this as a parent shell.
//Didnt think about that before but this would be the ideal place to render between those.

export default Profile;
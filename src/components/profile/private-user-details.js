import React, {useState} from "react";
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

    const [newPassword, setNewPassword] = useState({password: "", confirmedPassword: "", visible: false});

    const togglePasswordVisibility = () => {
        setNewPassword({...newPassword, visible: !newPassword.visible});
    }

    const submitPasswordChange = async () => {
        let response;
        if(newPassword.password === newPassword.confirmedPassword) {
            console.log("I am triggering, is this maybe a state thing?")
            response = await authAction.changePassword(dispatch, {...profile, password: newPassword.password});
            console.log(response);
        }
        if(response && response.modifiedCount === 1) {
            alert("Password changed succesffuly");
            newPassword.password = '';
            newPassword.confirmedPassword = '';
            setNewPassword({password: "", confirmedPassword: "", visible: false});
        } else {
            alert("Passwords must match. Please try again");
        }

    }


    return (
        <div>
            <div className="form-control">
                <h3>{languagePreference.updateProfilePic}</h3>
                <FileBase64 type ="file" multiple={false} onDone={({base64}) => updateProfilePic(base64)}/>
            </div>

            <div className="form-control">
                <h3>{languagePreference.changePassword}</h3>
                {/*<label className="col-form-label" htmlFor="inputPassword">{languagePreference.password}</label>*/}
                <input type="password" className="form-control" placeholder={languagePreference.newPassword} id="inputPassword" value={newPassword.password}
                       onChange={(e) => setNewPassword({...newPassword, password : e.target.value})}/>
                <div className="input-group">
                    <input type={newPassword.visible ? "text" : "password"} className="form-control" placeholder={languagePreference.confirmPassword} id="confirmPassword" value={newPassword.confirmedPassword}
                           onChange={(e)=> setNewPassword({...newPassword, confirmedPassword: e.target.value})}/>
                    <button type="button" onClick={togglePasswordVisibility}>
                        <i className={newPassword.visible ? "fas fa-eye-slash" : "fas fa-eye"}/>
                    </button>
                </div>
                <button type="button" className="btn btn-primary" onClick={submitPasswordChange}>{languagePreference.changePassword}</button>
            </div>
            {/*<h1>Your Password was last changed on: TBD</h1>
            Just getting rid of this for now. I think i initially thought all properties had a default way to get when they were updated, but
            it looks like password would have to change from being a simple string all the way to a sub schema with a timestamps option, which
            would breeak all of the other stuff and current accounts once we do it, so im going to have to maybe take that on once we move to the new
            db and just leaving it off for now while we are workingo n other features so we dont go bbreaking all of our test accounts just yet,
            would be a crazy amount of I would assume then latter not necessary checks to implemenet it now ehh?*/}
            {profile.role === 'PEN' && <PenDetails profile={profile}/>}
            {/*console.log(profile)*/}
            {/*<button className="btn btn-secondary" type="button" onClick={logoutUser}>{languagePreference.logout}</button>*/}
        </div>
    )
};

//This is where we can render the different types of profile screens i'm thinking. Use this as a parent shell.
//Didnt think about that before but this would be the ideal place to render between those.

export default PrivateUserDetails;
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import * as authService from "../services/auth-service";
import {useSelector} from "react-redux";
import FileBase64 from 'react-file-base64';

//Inspiration to use FileBase64 for images very loosely adapted from: https://medium.com/geekculture/upload-image-file-in-react-to-mongodb-362b02abfc71

const SignUp = () => {
    const navigate = useNavigate();

    const languagePreference = useSelector((state) => state.lang);

    //Local state var with getter and setter + default value
    //Setting default field values for user obj
    const [newUser, setNewUser] = useState({username:'', password:'', role: '', profilePic: ''});
    const [usernameFormLabel, setUsernameFormLabel] = useState({text:''});
    const [usernameStyling, setUsernameStyling] = useState({text:''});
    const [usernameFormStyling, setUsernameFormStyling] = useState({text:''});

    const signUpPressed = () => {
        //This one is fine since its not actually responsible for returning anything
        authService.signup(newUser).then(() => navigate('/appendre/profile')).catch((e) => alert('Username already in use'));
        //Lookinto custom alerts later
        // <div className="alert alert-dismissible alert-danger">
        //     <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        //     <strong>Username is already in use, please try again</strong>
        // </div>
    }

    //let usernameStyling = '';
    //let usernameFormStyling = '';
    //let usernameFormLabel = '';


//Potentially not the best way to do this as there is a lot of state manipulation. Will maybe want to lookinto using a reducer or
    //condtionally css combined with html form validation, but for now this is a lovely proof of concept and a huge improvement over
    //having to each time push submit to be told username is invalid. definitley a professional touch and
    //the "polished" type of look we are going for!
    const checkUserNameAvailability = () => {
        //setNewUser({...newUser, username: username.target.value});
        async function checkName () {
            const response = await authService.checkUsernameAvailability(newUser);
            //console.log(response);
            if(response) {
                setUsernameFormLabel({text: "Username Already Taken"});
                setUsernameStyling({text: 'is-invalid'});
                setUsernameFormStyling({text: 'has-danger'});
            } else {
                setUsernameFormLabel({text: "Username Valid!"});
                setUsernameStyling({text: 'is-valid'});
                setUsernameFormStyling({text: 'has-success'});
            }
        }
        checkName();
    }

    useEffect(checkUserNameAvailability, [newUser, newUser.username]);
    //so now fires whenever newuser in general changes ehh? Is that a problem with thi snow over firing ehh?
    //Is that a thing that could ever usually ever really be a problem in most cases hmmm? idk man.

    // const tester = (value) => {
    //     console.log(value.value);
    // }

    return(
        <div>
            {/*<div className= >*/}
            {/*    <label className="form-label mt-4" htmlFor="inputInvalid">Username</label>*/}
            {/*    <input type="text" placeholder="Username" className={`form-control ${usernameStyling}`}*/}
            {/*           id="inputInvalid" onChange={(username) => checkUserNameAvailability(username)}/>*/}
            {/*    <div className="invalid-feedback">${usernameFormLabel}</div>*/}
            {/*</div>*/}
            <h1>{languagePreference.signup}</h1>
            <form className= {`form-group ${usernameFormStyling.text}`}>
                <label className="col-form-label mt-4" htmlFor="inputUsername">{languagePreference.username}</label>
                <input type="text" className={`form-control ${usernameStyling.text}`} placeholder={languagePreference.username}
                       id="inputUsername" onChange={(username) => setNewUser({...newUser, username: username.target.value})}/>
                <div> {usernameFormLabel.text} </div>
                {/*Additional form control needed for non-empty fields. Although once "" "" is taken techincally its not possible. May also want to add password restrictions for more of a polished look*/}
                <label className="col-form-label mt-4" htmlFor="inputPassword">{languagePreference.password}</label>
                <input type="password" className="form-control" placeholder={languagePreference.password}
                       id="inputPassword" onChange={(e) => setNewUser({...newUser, password: e.target.value})}/>
                <h1>Upload a Profile Pic/ Profile Pic Upload</h1>
                {/*This doesn't look great for now, there is a side quest to maybe style it with slectors, so will revistit it later, but at least for now it is funcitonal yay!*/}
                <FileBase64 type ="file" multiple={false} onDone={({base64}) => setNewUser({...newUser, profilePic: base64})}/>

                <div className="btn-group list-group-item mt-2 col mb-2" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="accountType" id="ac1" autoComplete="off" value="PEN" onChange= {(event) => setNewUser({...newUser, role: event.target.value})} required/>
                    <label className="btn btn-outline-primary" htmlFor="ac1">Pen</label>
                    <input type="radio" className="btn-check" name="accountType" id="ac2" autoComplete="off" value="PAL" onChange={(event) => setNewUser({...newUser, role: event.target.value})} required/>
                    <label className="btn btn-outline-primary" htmlFor="ac2">Pal</label>
                </div>
                {/*Can make this a more complex variable for checking other field characteristics. Should be disabled if username is not valid since we are doing that now. Need to look into required prop more and why its not working here, this form of button enabled/disabled based on a staet variable is a little verbose Cleaner approach over alerting that it didnt work, preventing the mistake in the first place I think would be preferable.*/}
                <button type="button" className={`btn btn-primary ${(newUser.password === '' || newUser.role === '') ? 'disabled' : ''}`} onClick={signUpPressed}>{languagePreference.signup}</button>
            </form>

        </div>
    )
};

export default SignUp;
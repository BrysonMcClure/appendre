import React from "react";
import englishStrings from '../recources/strings-english';
import frenchStrings from '../recources/french-strings';
import {useNavigate} from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    //todoe: make this a state variable with a reducer linked to a session, make sure it trickles down to children. This will determine our
    //multilingual support throughout the app and make it from the top down super easy to support other languages going forward if we want to.
    const displayLanguage = englishStrings;

    function handleClick() {
        //doesnt change when i move a file, since this is fixed relative to what it is set as in the app.js me thinks
        navigate('/appendre');
    }

    function goToSignup() {
        navigate('/signup');
    }

    function goToLogin() {
        navigate('/login');
    }

    return(
        <div>
            <h1>{displayLanguage.welcome_to_appendre}</h1>
            <h2>{displayLanguage.about_appendre}</h2>
            <button type="button" className="btn btn-primary rounded-pill" onClick={goToLogin}>{displayLanguage.login}</button>
            <button type="button" className="btn btn-primary rounded-pill" onClick={goToSignup}>{displayLanguage.signup}</button>
            <button type="button" className="btn btn-primary rounded-pill" onClick={handleClick}>{displayLanguage.continue_as_guest}</button>
            {/*<div className="btn-group" role="group" aria-label="Basic radio toggle button group">*/}
            {/*    <input type="radio" className="btn-check" name="btnradio" id="btnradio1"*/}
            {/*           autoComplete="off" checked=""/>*/}
            {/*        <label className="btn btn-outline-primary" htmlFor="btnradio1">Radio 1</label>*/}
            {/*        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked=""/>*/}
            {/*        <label className="btn btn-outline-primary" htmlFor="btnradio2">Radio 2</label>*/}
            {/*        <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" checked=""/>*/}
            {/*        <label className="btn btn-outline-primary" htmlFor="btnradio3">Radio 3</label>*/}
            {/*</div>*/}

        </div>
    )
};

export default LandingPage;
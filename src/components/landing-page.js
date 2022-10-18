import React from "react";
import * as englishStrings from '../recources/strings-english';
import * as frenchStrings from '../recources/strings-french';
import {useNavigate} from "react-router-dom";

const LandingPage = () => {
    const navigate = useNavigate();
    //todoe: make this a state variable with a reducer linked to a session, make sure it trickles down to children. This will determine our
    //multilingual support throughout the app and make it from the top down super easy to support other languages going forward if we want to.
    const displayLanguage = englishStrings;

    function handleClick() {
        navigate('/appendre');
    }

    return(
        <div>
            <h1>{displayLanguage.WELCOME_TO_APPRENDRE}</h1>
            <h2>{displayLanguage.ABOUT_APPRENDRE}</h2>
            <button className="btn-primary rounded-pill">{displayLanguage.LOGIN}</button>
            <button className="btn-primary rounded-pill">{displayLanguage.SIGN_UP}</button>
            <button type="button" className="btn-primary rounded-pill" onClick={handleClick}>{displayLanguage.CONTINUE_AS_GUEST}</button>
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
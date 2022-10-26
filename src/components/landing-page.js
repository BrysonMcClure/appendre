import React from "react";
import {useSelector} from "react-redux";
//import englishStrings from '../recources/strings-english';
//import frenchStrings from '../recources/french-strings';
import {Outlet, useNavigate} from "react-router-dom";
import NavigationSidebar from "./appendre/navigation-sidebar";
import {Provider} from "react-redux";
import languagePreferenceReducer from "../reducers/language-preference-reducer";
//Had to remeber to install these pacakages via npm install. Not quite sure if --save was necessary here but did it in anycase. Dont think it can jurt anything
//But in case it does now we have a note of what we did
import {combineReducers, createStore} from "redux";
//const reducer =
const store = createStore(languagePreferenceReducer);

const LandingPage = () => {

    const languagePreference = useSelector((state) => state.lang);

    const navigate = useNavigate();
    //todoe: make this a state variable with a reducer linked to a session, make sure it trickles down to children. This will determine our
    //multilingual support throughout the app and make it from the top down super easy to support other languages going forward if we want to.
    //const displayLanguage = englishStrings;

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
            <h1>{languagePreference.welcome_to_appendre}</h1>
            <h2>{languagePreference.about_appendre}</h2>
            <button type="button" className="btn btn-primary rounded-pill" onClick={goToLogin}>{languagePreference.login}</button>
            <button type="button" className="btn btn-primary rounded-pill" onClick={goToSignup}>{languagePreference.signup}</button>
            <button type="button" className="btn btn-primary rounded-pill" onClick={handleClick}>{languagePreference.continue_as_guest}</button>
        </div>
        // <div>
        //
        //     {/*<div className="btn-group" role="group" aria-label="Basic radio toggle button group">*/}
        //     {/*    <input type="radio" className="btn-check" name="btnradio" id="btnradio1"*/}
        //     {/*           autoComplete="off" checked=""/>*/}
        //     {/*        <label className="btn btn-outline-primary" htmlFor="btnradio1">Radio 1</label>*/}
        //     {/*        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" checked=""/>*/}
        //     {/*        <label className="btn btn-outline-primary" htmlFor="btnradio2">Radio 2</label>*/}
        //     {/*        <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" checked=""/>*/}
        //     {/*        <label className="btn btn-outline-primary" htmlFor="btnradio3">Radio 3</label>*/}
        //     {/*</div>*/}
        // </div>
    )
};

export default LandingPage;
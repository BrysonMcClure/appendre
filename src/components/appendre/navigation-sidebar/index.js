import React from "react";
import {useDispatch, useSelector} from "react-redux";
//import {getLanguage, setLanguage} from "../../../actions/language-action";
import {PAGE_SIZE} from "../../write-letter";

const NavigationSidebar = () => {

    //const dispatch = useDispatch();

    const languagePreference = useSelector((state) => state.lang);

    // const frenchClicked = () => {
    //     setLanguage(dispatch, "FRENCH");
    // }
    //
    // const englishClicked = () => {
    //     setLanguage(dispatch, "ENGLISH");
    // }

    return(
        <div className="list-group">
            {/*console.log(languagePreference) 0 is always the start right? cant imagine a case in which we would want to make this a var or anything,
            if you want somewhere in the middle or something that is for you the user to manage/ take care of once you get on the page via pagination right??*/}
            <a href="/appendre/profile" className="list-group-item list-group-item-action active">{languagePreference.profile}</a>
            <a href={`/appendre/letters/0/${PAGE_SIZE}`} className="list-group-item list-group-item-action">{languagePreference.trending_letters}</a>
            <a href="#" className="list-group-item list-group-item-action disabled">{languagePreference.trending_replies}
                <span className="badge bg-primary rounded-pill">14</span>
            </a>
            {/*<div className="btn-group list-group-item" role="group" aria-label="Basic radio toggle button group">*/}
            {/*    <input type="radio" className="btn-check" name="btnradio" id="btnradio1"*/}
            {/*           autoComplete="off" onClick={frenchClicked}/>*/}
            {/*    <label className="btn btn-outline-primary" htmlFor="btnradio1">{languagePreference.french}</label>*/}
            {/*    <input type="radio" className="btn-check" name="btnradio" id="btnradio2"*/}
            {/*               autoComplete="off" onClick={englishClicked}/>*/}
            {/*    <label className="btn btn-outline-primary" htmlFor="btnradio2">{languagePreference.english}</label>*/}
            {/*</div>*/}
        </div>
    )
};

export default NavigationSidebar;
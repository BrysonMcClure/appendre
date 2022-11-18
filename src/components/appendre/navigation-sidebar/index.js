import React, {useEffect}from "react";
import {useDispatch, useSelector} from "react-redux";
//import {getLanguage, setLanguage} from "../../../actions/language-action";
import {PAGE_SIZE} from "../../write-letter";
import * as authAction from "../../../actions/auth-action";
import {useNavigate} from "react-router-dom";
import {getLanguage} from "../../../actions/language-action";
import {getProfile} from "../../../actions/auth-action";

export const SEARCH_LINK = "/appendre/search";
export const WRITE_LETTER_LINK = `/appendre/write-letter`

const NavigationSidebar = ({active = '/profile'}) => {

    //const dispatch = useDispatch();

    const languagePreference = useSelector((state) => state.lang);

    const profile = useSelector((state) => state.profile);

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

    //We use profile, s I guess yea, as a top level component using profile we are in fact responsible for calling it in, I guess that makes sense.
    //Would have though a reducer change would trriger everything to get update, but I guess maybe its
    //just the stale one or something maybe, idk, I would still think it would update it. hmmmmmm.

    // useEffect(() => {
    //     getProfile();
    // }, []);


    // const frenchClicked = () => {
    //     setLanguage(dispatch, "FRENCH");
    // }
    //
    // const englishClicked = () => {
    //     setLanguage(dispatch, "ENGLISH");
    // }
    //Should these liniks/ should we make them an exported var for consitency incase we decide to change routes later?
    //hmmm, maybe, may not be a bad idear.

    return(
        <div className="list-group">
            {/*console.log(languagePreference) 0 is always the start right? cant imagine a case in which we would want to make this a var or anything,
            if you want somewhere in the middle or something that is for you the user to manage/ take care of once you get on the page via pagination right??*/}
            {profile._id && <a href="/appendre/profile" className="list-group-item list-group-item-action active">{languagePreference.profile}</a>}
            <a href={`/appendre/letters/0/${PAGE_SIZE}`} className="list-group-item list-group-item-action">{languagePreference.trending_letters}</a>
            <a href={SEARCH_LINK} className="list-group-item list-group-item-action">{languagePreference.search}</a>
            {profile._id &&
                <a href={WRITE_LETTER_LINK} className="list-group-item list-group-item-action">{languagePreference.writeALetter}</a>
            }

            {profile._id &&
                 <div className="list-group-item list-group-item-action" onClick={logoutUser}>
                     <span>{languagePreference.logout}</span>
                     <i className="fas fa-right-from-bracket mt-2 float-end"></i>
                 </div>
            }
            {/*not really sure trending replies really amkes sense anyway right because you dont wannt read a a
            bunch of replies with no context right? leaving this here for now though as a way to remeber how to do tdisabled links with a
            tiny number badge for maybe other stuff later like unread replies maybe if we really wanted to
            get fancy with the spices or something? huh?
            <a href="#" className="list-group-item list-group-item-action disabled">{languagePreference.trending_replies}*/}
            {/*    <span className="badge bg-primary rounded-pill">14</span>*/}
            {/*</a>*/}
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
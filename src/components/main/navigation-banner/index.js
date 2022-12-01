import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {setLanguage, getLanguage} from "../../../actions/language-action";
import {getProfile} from "../../../actions/auth-action";
import englishStrings from "../../../recources/english-strings";
import frenchStrings from "../../../recources/french-strings";
//import {useNavigate} from "react-router-dom";

const NavigationBanner = () => {

    const languagePreference = useSelector((state) => state.lang);
    const profile = useSelector((state) => state.profile);

    //const navigate = useNavigate();

    const dispatch = useDispatch();

    // const myFunction = () => {
    //     async function establishLanguage() {
    //         await setLanguage(dispatch, "ENGLISH");
    //     }
    //     establishLanguage();
    // }

    const frenchClicked = () => {
        setLanguage(dispatch, "FRENCH");
    }

    const englishClicked = () => {
        setLanguage(dispatch, "ENGLISH");
    }

    //Everytime I refresh zee page, becuase of language stuff and reducers getting rest, we know that nagivation banner
    //is getting re-rendered because/ and this is evidence by, the language getting pulled in, and then logically defaulting to english from reducer if
    //aciton return is undefined, or the proper language if it is defined.

    //Load the language preference into the reducer on load
    //This one doesnt neet an empty dependency array to not fire a bunch? I genuinley am confused on the rules now.
    //so getlanguage doestn go a million times when no dependencies array, but profile does. Only seems to happen when logged in to, super wierd, i am not quite sure what
    //is going on here hmmmmmm
    //always rending something with language or profile hence why they are going at the top level here
    useEffect(() => {
        //console.log("Im thee problemoocho" + Date.now());
        getLanguage(dispatch);
        //loadthe profile into the reducer
        //AS far as i can tell then, this is not just some new behavior that broke when we changed other things, but rather an existing problem with loading
        //the profile when we refreshed on a non-profile screen and it just went unnoticed. Also helps explains a lot of the logged on issues I was having in the
        //first place beyond just because I restarted the server which will very likely a part of it, was also likely not the whole picture/ issue
        //which again helps to explain why it was happening so often. Ahhhhh, nice!
        getProfile(dispatch);
    }, []);

    //useffect is a render, not a load trigger i think, that should make a big difference for us in rug pull server scenarios.

    //Banner gets loaded everywhere, which means on first application load, profile if undefined should boot you back here, no matter the page, since
    //On first load, profile gets established and thus changes period, I belieive.

    //Setting up an effect to always bring the user back to here if not logged in oh wait what about continue as guest, we are required to support that use case. ahh dammit!
    //Ok fine for now, but we may need to move this to just the top of all profile dependent content. IDK.
    //This may actually not be the best way to do this, but im not really sure where else it would be appropriate to capture a mysterious logout happening
    //Hopefully this continues to work as expected and does not cause major problems down the road as I fear it has the power to do if not respected.
    // useEffect(() => {
    //     console.log("Im trying me best captain/boss");
    //     console.log(profile);
    //     if (!profile.username) {
    //         console.log("Redirect Triggered");
    //         //fixing circular reference, twas accidental just was looking at the wrong thing me thinks
    //         //confirmed, reredingin react app does reload page even if it is just a soft reload, happens when I make react changes I think.
    //         //navigate('/');
    //         //this is moving because of problem where for breif second on page reload, before profile gets resetablished, this also triggers and seems to
    //         //finish first I think, resulting in a redirect happening to the landingpage component, even thoough i was still logged in, going to switch to just
    //         //using this as an on load blocker for profile required content, shoudl also then prevent guest users from getting the boot on a reload.
    //     }
    // }, [profile])
    //It can be an object, its just that the dependencies propertiy is an array, aka an dependency array and expects a list of arguments it should be watching out for I believe.

    return(
        <div>
            <div className="row">
                {/*Dynamically setting link to redirect to login/home based on logged in or not.*/}
                {/*console.log(profile.username ? '/appendre' : "/")*/}
                <div className="col">
                    <a href={profile.username ? "/appendre" : "/"} className="col"><h1>Appendre</h1></a>

                </div>
                <div className="btn-group mt-2 col-auto" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1"
                           autoComplete="off" onChange={frenchClicked} checked={languagePreference === frenchStrings}/>
                    <label className="btn btn-outline-primary" htmlFor="btnradio1">{languagePreference.french}</label>
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2"
                           autoComplete="off" onChange={englishClicked} checked={languagePreference === englishStrings}/>
                    <label className="btn btn-outline-primary" htmlFor="btnradio2">{languagePreference.english}</label>
                </div>

            </div>

            <div>{profile.username ? `Logged in As ${profile.username}` : ''}</div>
        </div>
    )
};

export default NavigationBanner;
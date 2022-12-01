import React from "react";
//import * as authService from "../../services/auth-service"
//import * as authAction from "../../actions/auth-action"
//import {useNavigate} from "react-router-dom";
//import {useSelector} from "react-redux";
// import PenDetails from "./pen-details";
// import {getLanguage} from "../../actions/language-action";
// import {getProfile} from "../../actions/auth-action";
import {Outlet} from "react-router-dom";

const Profile= () => {
    //const languagePreference = useSelector((state) => state.lang);
    ///console.log(languagePreference);
    //totally should make this a recuder later I think.
    //const [profile, setProfile] = useState({});
    // const profile = useSelector((state) => state.profile);
    // const navigate = useNavigate();
    //
    // const dispatch = useDispatch();

    //Once on load, make sure we are logged in, if not this page was accessed inadvertley and we should just bounce user
    //back to landing page. Not sure if this is the best/ most graceful way to do this, but at least for now this is the most elegant
    //soultion I can think of, and I think it will work pretty well.
    //Too many issues with loading order and profile not being defined on load resulting in unlogged in behavior for
    //Logged in use. Going to sleep on this for a while and come back to it later. Feels like there needs to be a better way
    //useEffect(() => {
    // would nee to make this an async to actually wait for profile to load in before calculating on it i think,
    // just now realizgin that might have been this issue since I did not async call this.
    //     authAction.getProfile(dispatch).then(() => {
    //         console.log(profile.username, Date.now());
    //         if (!profile.username) {
    //             navigate('/');
    //         }
    //     }
    //     )
    //
    // }, [] )

    // useEffect(() => {
    //     //load profile screen, need to load profile once on reeender. Helps avoid refresh issue with
    //     //first login not loading profile immeidatleey
    //     //What was that other routing thing I think i wanted to fix first before working moree on documents
    //     //rending? idk
    //     getProfile(dispatch);
    // }, []);

    // const setUpProfile = () => {
    //     async function establishProfile() {
    //         //should call the action not the service in the future so again this is a reducer thing
    //         const user = await authService.profile();
    //         setProfile(user);
    //     }
    //     establishProfile();
    // }

    // const logoutUser = async () => {
    //     //Changing this to use the action instead, now that profile is a reducer and not a local state var,
    //     //Just to make it explicit that we are clearing the session, instead of just redirecting and counting
    //     //On next login to repole session. Essentially action is just helping us to maintain parody explicitly
    //     //Of reducer and server status rather than counting on next load to overrite with new session data me thinks.
    //     const response = await authAction.logout(dispatch);
    //     //Nice, fixed void return type and this works now. Check mark.
    //     if (response === "OK") {
    //         navigate('/');
    //     }
    //     else {
    //         alert("Logout Failed, Please Try again");
    //     }
    //     console.log(response);
    // }

    //Once on load, loading the users profile into memory for our reducer to use and render later
    // useEffect(() => {
    //     //console.log("Ahh, is it a circular reaction?")
    //     //OK so a little note, this was callingiteslf repatedly over and over. It think was also related to our timeout issue
    //     //With the server that the console was complaining about, essentially we were just bomparding the page
    //     //With profile update requests. Long and short of it, you need the [] dependency array. I could have sworn
    //     //It has yelled at me before for having it defined, but turns out emtpy array means one load/call per render of page,
    //     //but no array means just keeps going, thus the loop we were creating with our other element in nav bar
    //     //which was dependent on profile changing/updating, which again it was over and over again here. Good to note,
    //     //going to go check for other instances/ slip ups of this. I really feel like I have had a lot of inconsitency
    //     //wierd behavior with use effect, but maybe I am just misrembering/ confusing it with something else, idk.
    //     authAction.getProfile(dispatch);}, []);


    return (
        <div>
            {/*console.log(profile)*/}
            <Outlet/>
        </div>
    )
};

//This is where we can render the different types of profile screens i'm thinking. Use this as a parent shell.
//Didnt think about that before but this would be the ideal place to render between those.

export default Profile;
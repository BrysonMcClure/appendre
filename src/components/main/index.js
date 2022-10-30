import React, {useEffect} from "react";
/*{useEffect}*/
import {Outlet} from "react-router-dom";
import {Provider} from "react-redux";
import lettersReducer from "../../reducers/letters-reducer";
import languagePreferenceReducer from "../../reducers/language-preference-reducer";
import profileReducer from "../../reducers/profile-reducer";
//Had to remeber to install these pacakages via npm install. Not quite sure if --save was necessary here but did it in anycase. Dont think it can jurt anything
//But in case it does now we have a note of what we did
import {combineReducers, createStore} from "redux";
import {setLanguage} from "../../actions/language-action";
import NavigationBanner from "./navigation-banner";
const reducer = combineReducers({lang: languagePreferenceReducer, letters: lettersReducer, profile: profileReducer});
//const store = createStore(languagePreferenceReducer);
const store = createStore(reducer);
//Need to look into what the non-deprecated version of this that we should be using should be.
//import {useNavigate} from "react-router-dom";

const Main = () => {

    //Has to be created with the object we return so they package together me thinks
    //const dispatch = useDispatch();
    //const dispatch = useDispatch();
    // const test = "test";
    // const myFunction = () => {
    //     async function establishLanguage() {
    //         await setLanguage(dispatch, "ENGLISH");
    //     }
    //     establishLanguage();
    // }

    //Should probably be using imported consts if we are going to stick with strings over passing around language object types.
    //Hmm still not sure on which one is better, but the good news is the change should just be at the serivce level and nothing should have to change withhow the
    //output of the service is used (which is the majority of where calls are) and only at the setting/getting of the service me thinks.

    //Default session language as english. Better than setting a reducer default since that would override session setting on a reload
    //useEffect(() => {}, []);
    return(
        <Provider store={store}>
            <NavigationBanner/>
            <Outlet/>
        </Provider>
    )
};

export default Main;
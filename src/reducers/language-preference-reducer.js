//import * as frenchStrings from "../recources/strings-french"
import englishStrings from "../recources/english-strings"
import frenchStrings from "../recources/french-strings";
import {SET_LANGUAGE, GET_LANGUAGE} from "../actions/language-action";
//Having a default value means on reload it gets overritten, instead of pulling the updated value from the session server
//Will need to implement some sort of hook then for setting the language on the first load, from there the session cookies should take care of it
const languagePreferenceReducer = (lang = {}, action) => {
    switch (action.type) {
        case SET_LANGUAGE:
            //console.log(action.language);
            //Accidentally NAILED IT! When intial repluy from state comes back '', this form of logoic
            //Results in English being returned as the default unless french is speficially specified in the session variables that get sent here from the service by the actions
            //May need to add a special case for initally undefined session information getting passed here
            //by our start off get call which sets things in motion on load with the effect thingy, if we ever decide to switch to obbjects over strings.
            return(action.language === "FRENCH" ? frenchStrings : englishStrings);
        case GET_LANGUAGE:
            return (action.language === "FRENCH" ? frenchStrings : englishStrings);
        default:
            return lang;
    }
}
export default languagePreferenceReducer;
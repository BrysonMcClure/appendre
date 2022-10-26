import React, {useEffect} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {setLanguage, getLanguage} from "../../../actions/language-action";
import englishStrings from "../../../recources/english-strings";
import frenchStrings from "../../../recources/french-strings";

const NavigationBanner = () => {

    const languagePreference = useSelector((state) => state.lang);

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

    useEffect(() => {
        //console.log("Im thee problemoocho" + Date.now());
        getLanguage(dispatch);});

    return(
        <div className="row d-flex">
            <a href="/" className="col"><h1>Appendre</h1></a>
            <div className="btn-group col list-group-item float-end mt-2" role="group" aria-label="Basic radio toggle button group">
                <input type="radio" className="btn-check" name="btnradio" id="btnradio1"
                       autoComplete="off" onChange={frenchClicked} checked={languagePreference === frenchStrings}/>
                <label className="btn btn-outline-primary" htmlFor="btnradio1">{languagePreference.french}</label>
                <input type="radio" className="btn-check" name="btnradio" id="btnradio2"
                       autoComplete="off" onChange={englishClicked} checked={languagePreference === englishStrings}/>
                <label className="btn btn-outline-primary" htmlFor="btnradio2">{languagePreference.english}</label>
            </div>
        </div>


    )
};

export default NavigationBanner;
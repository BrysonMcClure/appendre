import React from "react";
import {useSelector} from "react-redux";

const LetterList = () => {

    const languagePreference = useSelector((state) => state.lang);

    return(
        <div>
            <h1>{languagePreference.myLetters}:</h1>
        </div>

    )
};

export default LetterList;
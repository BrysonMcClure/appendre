import React, {useState} from "react";
import {useSelector} from "react-redux";
import LetterListItem from "./letter-list-item";

//Does not like dashes apperntly
const LettersList = ({lettersList, charCap}) => {

    const languagePreference = useSelector((state) => state.lang);
    //const letters = useSelector((state) => state.letters);
    //Key is a property all objects/ components automatically get to allow for differentiation and rendering managment I do believe.
    return(
        <div>
            <ul className="list-group">
                {
                    //Checks for definment first me thinks?
                    lettersList && lettersList.map((letter) => {
                        return (<LetterListItem key={letter._id} letter={letter} charCap={charCap}/>);
                    })
                }
            </ul>
        </div>

    )
};

export default LettersList;
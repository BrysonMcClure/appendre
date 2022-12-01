import React from "react";
import LetterListItem from "./letter-list-item";

//Does not like dashes apperntly
//old pagination stuff if maybe we decide to go back to doing it this way huh hmmmmmm?
//, paginationLinkStub, paginationPageSize, paginationCurrentStartIndex
const LettersList = ({lettersList, charCap, withReplies}) => {

    //const languagePreference = useSelector((state) => state.lang);
    //const letters = useSelector((state) => state.letters);
    //Key is a property all objects/ components automatically get to allow for differentiation and rendering managment I do believe.
    return(
        <div>
            <ul className="list-group">
                {console.log(lettersList, "Letters List")}
                {
                    //Checks for definment first me thinks?
                    lettersList && lettersList.map((letter) => {
                        return (<LetterListItem key={letter._id} letter={letter} charCap={charCap} withReplies={withReplies}/>);
                    })
                }
            </ul>
        </div>

    )
};

export default LettersList;
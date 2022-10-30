import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {findAllLetters, findLetterById} from "../../actions/letters-action";
import LetterListItem from "../write-letter/letter-list-item";


const SingleLetter = () => {

    const params = useParams();
    console.log(params.letterId);
    const dispatch = useDispatch();

    const languagePreference = useSelector((state) => state.lang);
    const letters = useSelector((state) => state.letters);

    // const letterToShow = async () => {
    //     const letter = await findLetterById(params.letterId);
    //     console.log("triggered");
    //     console.log(letter);
    //     return letter;
    // }

    useEffect(() => {
        async function loadLetter () {
            await findLetterById(dispatch, params.letterId);
        }
        loadLetter();
    }, []);

    //Lazy eval == protection? Nope as it turns out
    // const loaded = () => {
    //     if(letters.length !== 0) {
    //         return letters[0]._id === params.letterId;
    //     }
    //     return false;
    // }

    return(
        <div>
            {console.log(letters)}
            {letters && <LetterListItem letter={letters}/>}
        </div>
    );
}
export default SingleLetter;
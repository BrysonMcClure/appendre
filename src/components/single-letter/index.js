import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {findLetterById} from "../../actions/letters-action";
import LetterListItem from "../write-letter/letter-list-item";


const SingleLetter = () => {

    const params = useParams();
    console.log(params.letterId);
    const dispatch = useDispatch();

    //const languagePreference = useSelector((state) => state.lang);
    const letters = useSelector((state) => state.letters);
    const profile = useSelector((state) => state.profile);

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
    }, [dispatch, params.letterId]);
    //Im still not exactly quite sure how this works I guess yet hmmmmmm?mmmmm??????????????
    //I guess maybe its like a dont call this until its loaded in because we need it and so cant really do our on load function wtihout it ehh?
    //Could we maybe do something like this with our loaded drop down for search things maybe?
    //This might like then be a way to say hay dont make this variable until the language is loaded, and so that way everything
    //is loaded to go from the geet go right ehh? Might be better then when language changes reproceessing it?
    //Idk man. you know. hmmm, maybe that is a good way to go about it. Idk. hmm. ok, we can try that in a bit then ok.

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
            {letters.length === 1 && <LetterListItem letter={letters[0]} withReplies={true} editable={letters[0].author._id === profile._id}/>}
        </div>
    );
}
export default SingleLetter;
import React, {useEffect} from "react";
import {useSearchParams, useParams} from "react-router-dom";
import {findLettersByAttribute} from "../../../actions/letters-action";
import {useDispatch, useSelector} from "react-redux";
import LettersList from "../../write-letter/letters-list";
import {CHAR_CAP} from "../letters";
import Pagination from "../../pagination";
import {PAGE_SIZE} from "../../write-letter";

//This is a cheeat, but until i can figure the work around for needing searchparams as the dependencies, using this for now just to get thigns
//up and off the ground and running for now ehhh?????
/* eslint-disable */

const LettersSearchResults = () => {

    //Nice, outlet has access to the seach params as well, I guess that makes pretty good sense so good.
    const searchParams = useSearchParams();

    const letters = useSelector((state) => state.letters);

    const languagePreference = useSelector((state) => state.lang);

    const params = useParams();

    const dispatch = useDispatch();

    const [attribute, value] = [...searchParams[0]][0];

    //Set the reducers letters state to now have/ be the/ be / have focus/ focused on our subb set of
    //letters which is our search results, which we then poll and display ehh? rather than using a state var I think that\//makes sense right,
    //also this way we use a hook and a state var which will update verything then derived from that source of truth as opposed to having
    //maybbe things not rerender right? I think/ would asuume/ hope/ think tihis is the way things work around here right?????
    useEffect(() => {
        async function searchForLetters () {
            await findLettersByAttribute(dispatch, [...searchParams[0]]);
            console.log("triggered");
        }
        //Protect against mutated url erroring out do to no search params. Nip in bud here or handle on server side? IDK
        searchParams && searchForLetters();
        console.log(...searchParams[0], "searche paramamsmsms")
    }, [dispatch, value])
    //Again dispath dependencies thingy i hope it shouldnt muck anything up ehhh?


    return(
        <div>
            {/*<h1>{console.log(...searchParams, "This guy")}Letters Search Results page</h1>*/}
            {/*Need to make dynamic if no results*/}
            {console.log(letters, "server rpely")}
            <h1>{languagePreference.resultsFor + " " + languagePreference.letter + 's ' +
                 languagePreference.with + " " + attribute + " " + languagePreference.matching + " \"" + value + "\""}</h1>
            <LettersList lettersList={letters.slice(params.start, params.end)} charCap={CHAR_CAP}/>
            {letters.length >= 1 && <Pagination linkStub="/appendre/search/letters-search" searchParams={searchParams} listSize={letters.length} elementsPerPage={PAGE_SIZE} currentStartIndex={params.start}/>}
        </div>
    );
}

export default LettersSearchResults

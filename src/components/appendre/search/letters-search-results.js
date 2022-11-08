import React, {useEffect} from "react";
import {useSearchParams, useParams} from "react-router-dom";
import {findLettersByAttribute} from "../../../actions/letters-action";
import {useDispatch, useSelector} from "react-redux";
import LettersList from "../../write-letter/letters-list";
import {CHAR_CAP} from "../letters";
import Pagination from "../../pagination";
import {PAGE_SIZE} from "../../write-letter";

const LettersSearchResults = () => {

    //Nice, outlet has access to the seach params as well, I guess that makes pretty good sense so good.
    const [searchParams, setSearchParams] = useSearchParams();

    const letters = useSelector((state) => state.letters);

    const languagePreference = useSelector((state) => state.lang);

    const params = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        async function searchForLetters () {
            await findLettersByAttribute(dispatch, [...searchParams]);
            console.log("triggered");
        }
        //Protect against mutated url erroring out do to no search params. Nip in bud here or handle on server side? IDK
        searchParams && searchForLetters();
    }, [searchParams])

    const [attribute, value] = [...searchParams][0];


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

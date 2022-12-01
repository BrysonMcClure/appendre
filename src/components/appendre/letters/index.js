import React, {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {findAllLetters} from "../../../actions/letters-action";
import LettersList from "../../write-letter/letters-list";
import Pagination from "../../pagination";
import {PAGE_SIZE} from "../../write-letter";

const PAGINATION_STUB = "/appendre/letters";
export const CHAR_CAP = "300";

const Letters = () => {

    const languagePreference = useSelector((state) => state.lang);
    const letters = useSelector((state) => state.letters);

    const params = useParams();

    const dispatch = useDispatch();

    //Hopefully this doesnt break everything. It wants dispatch as part of the dependency array because it is used within,
    //And I think I know now I dont want to just remove the dependency array since then it will run a ton of times maybe uneccessarily, ehhhh hmmmm?
    //so adding this for now, thoeretically it does not change and... should then only load once and at most retriggeer the use effect hook once ehh maybe yay?
    useEffect(() => {
        async function loadLetter (){
            await findAllLetters(dispatch);
        }
        loadLetter();
    }, [dispatch]);

    return(
        //No logged in checks as, this level of stuff would be public user accessible.
        <div>
            <h1>{languagePreference.trending_letters}</h1>
            {letters.length >= 1 && <LettersList
                lettersList = {letters.slice(params.start,params.end)} charCap = {CHAR_CAP}/>}
            {letters.length >= 1 && <Pagination linkStub={PAGINATION_STUB}
                                               listSize={letters.length} elementsPerPage={PAGE_SIZE} currentStartIndex={params.start}/>}
        </div>
    );
}

export default Letters;
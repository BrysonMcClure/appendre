import React, {useState} from "react";
import {useSearchParams, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import * as authService from "../../../services/auth-service"
import UsersList from "./users-list";
import Pagination from "../../pagination";
import {PAGE_SIZE} from "../../write-letter";

const UsersSearchResults = () => {

    const searchParams = useSearchParams();

    const [usersList, setUsersList] = useState([]);

    const params = useParams();

    //const dispatch = useDispatch();

    const languagePreference = useSelector((state) => state.lang);

    useEffect(() => {
        async function searchForLetters () {
            //would be willing to abstract this out like we did with letters, once we move to an action for this over a service, as a service I think it should really only be responsible for
            //interfacing with the server via an http request as a translation layer for us and nothing else.
            const [attribute, value] = [...searchParams[0]][0];
            console.log(searchParams[0], "nooo, loooook attttt meeeeee");
            const testArray = ['a', 'b'];
            const [one, two] = testArray;
            console.log(one, "loookkkk atttt meeeeee");
            console.log(attribute, "atributeeee");
            const result = await authService.findUsersByAttribute(attribute, value);
            setUsersList(result);
            console.log("triggered");
        }
        //Protect against mutated url erroring out do to no search params. Nip in bud here or handle on server side? IDK
        searchParams && searchForLetters();
    }, [searchParams])

    const [attribute, value] = [...searchParams][0];

    return(
        <div>
            {console.log([...searchParams], "Cette Gene")}
            {/*<h1>UsersSearchResults page</h1>*/}
            {console.log(usersList, "Results")}
            <h1>{languagePreference.resultsFor + " " + languagePreference.user + 's ' +
                 languagePreference.with + " " + attribute + " " + languagePreference.matching + " \"" + value + "\""}</h1>
            {usersList && <UsersList usersList={usersList.slice(params.start, params.end)}/>}
            {usersList.length >= 1 && <Pagination linkStub="/appendre/search/users-search" searchParams={searchParams} listSize={usersList.length} elementsPerPage={PAGE_SIZE} currentStartIndex={params.start}/>}

        </div>
    );
}

export default UsersSearchResults
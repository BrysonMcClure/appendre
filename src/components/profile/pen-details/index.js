import React from "react";
//import {useSelector} from "react-redux";
//import {useNavigate} from "react-router-dom";
// import CollaboratorList from "./collaborator-list";
// import MyLetterList from "./my-letter-list";
// import {PAGE_SIZE} from "../../write-letter";
import LettersList from "../../write-letter/letters-list";
//import Pagination from "../../pagination";

const PenDetails = ({profile}) =>  {

    //const navigate = useNavigate();

    //const languagePreference = useSelector((state) => state.lang);

    // const LETTERSTARTINDEX = 0;
    // const LETTERENDINDEX = 10;

    //Just a note, ran into some weird behavior here, having also just in gernal run into problems with this before.
    //It was mad that I wasnt using an useEffect hook to call navigate. Also when this was a function as opposed to a react component/functional element I think,
    //It had weird rendering issues claiming I could not direct to rendining something else outside of the Browser Router in App.js
    //WE learned useNavigate is a hook, which returns a function, which now that I look at it i guess would be Navigate. So, redirection calls I guess cant
    //really use this as a function, but instead need to basically call this as a rendered component temporarily, which basically I think then just evaluates to the new screen,
    //making it a sub rendering I think. I am not quite sure, but this now all flows and renders warning and error free which is loverly.
    // const writeALetter = () => {
    //     navigate(`/appendre/write-letter/0/${PAGE_SIZE}`);
    // }

    return(
        <div>
            {/*Old defunct way of doing this back when we were going to have collaborators show up on profile page,
            but now we have them shoing up on the sidebar, so probably safe to delete this, but leaving it as a hanging reference fore now maybe in case we
            change our minds? This component is just a place holder anyway so theoetically that shouldnt be a big deal right???*/}
            {/*<CollaboratorList/>*/}
            {/*This needs to change to just a specific letter list componnent(
            according to the new changes we should only ever deal in populated elements, and only know about
            the existeence of unpopulated ones in so far as sending an id for some linking as opposed to the whole
            object existing speficially as a sub component inside of a nother right? I believe for  now this is correct
            , so hopefully/ fingers corssed we should have the pay off of the letter list kind of just wokring right?*/}
            {/*Just going to make this the most recent letters for now maybe instead of pagination? Can maybe make all my letters a more detailed view then?*/}
            <LettersList lettersList={profile.letters.slice(0,3)} withReplies={false} charCap={300}/>
            {/*<button type="button" className="btn btn-primary" onClick={writeALetter}>{languagePreference.writeALetter}</button>*/}
            {/*<h1>Hello World sup!</h1>*/}
        </div>

    )
};

export default PenDetails;
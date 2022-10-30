import React from "react";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import CollaboratorList from "./collaborator-list";
import MyLetterList from "./my-letter-list";

const PenDetails = () =>  {

    const navigate = useNavigate();

    const languagePreference = useSelector((state) => state.lang);

    //Just a note, ran into some weird behavior here, having also just in gernal run into problems with this before.
    //It was mad that I wasnt using an useEffect hook to call navigate. Also when this was a function as opposed to a react component/functional element I think,
    //It had weird rendering issues claiming I could not direct to rendining something else outside of the Browser Router in App.js
    //WE learned useNavigate is a hook, which returns a function, which now that I look at it i guess would be Navigate. So, redirection calls I guess cant
    //really use this as a function, but instead need to basically call this as a rendered component temporarily, which basically I think then just evaluates to the new screen,
    //making it a sub rendering I think. I am not quite sure, but this now all flows and renders warning and error free which is loverly.
    const writeALetter = () => {
        navigate('/appendre/write-letter');
    }

    return(
        <div>
            <CollaboratorList/>
            <MyLetterList/>
            <button type="button" className="btn btn-primary" onClick={writeALetter}>{languagePreference.writeALetter}</button>
            <h1>Hello World sup!</h1>
        </div>

    )
};

export default PenDetails;
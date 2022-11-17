import React from "react";
import {useDispatch, useSelector} from "react-redux";
import TagList from "./tag-list";
import {useNavigate} from "react-router-dom";
import Replies from "../replies";
import * as authAction from "../../actions/auth-action";

//withReplies, determines if the letter list item displays the letter's replies or not, false by default.
//Allows us to use the same method to then render a detailed letter view using the same method later on, might just change it to a detailed mode flag in general if
//we decided to add other details on single letter view vs list view mode to help make summary and search results pages a little more streamlined maybe. IDK.
const LetterListItem = ({letter, charCap, withReplies = false, editable= false}) => {

    const languagePreference = useSelector((state) => state.lang);

    //Using as a logged in checker to only display reply button if a palUser
    const profile = useSelector((state) => state.profile);

    const palUserLoggedIn = profile.role === "PAL";

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const goToDetailedLetterView = () => {
        navigate(`/appendre/letterDetails/${letter._id}`);
    }

    const goToUsersPublicProfile = () => {
        if(letter.author) {
            navigate(`/appendre/profile/${letter.author._id}`);
        }
    }
    const deleteLetter = async () => {
        console.log("yo");
        const response = await authAction.deleteLetter(dispatch, profile._id, letter);
        console.log(response, "delete shit");
        if(response.deletedCount && response.deletedCount === 1) {
            //Appently, according to the internet, navigate -1 is the equivalent of the user hitting the back button, that would be amazing if
            //that jsut works out of the box without having to read the current path and subtracting an extension, which I could then also imagine a sceneario
            //in which that wouldnt necessarily always work maybe? hmmmmmm? idk????
            navigate(-1);
        }
    }

    return(
        // <div>
        //     <h1>This is a letter</h1>
        //     <h1>{letter.text}</h1>
        //     <h1>{letter.author.username}</h1>
        //     <h1>{letter.author.role}</h1>
        // </div>
        //Ok, so good to note, without the () =>, inline function declaration stuff, the thing freak out and just constantly
        //calls the function everytime there is an event on the page it appears (typing in a text field kept triggering it).
        //Guess its the difference of it being a "triggered funciton" vs like just a declaration that gets declared on everylaod I think.
        //Figured this out by looking at other item button declarations. Freaking crazy man. Freaking crazy man.
        <div className="card mb-3">
            <h3 className="card-header" onClick={() => goToDetailedLetterView()}>{languagePreference.letter}</h3>
            <div className="card-body">
                <h5 className="card-title">
                    {letter && letter.title}
                    {editable &&
                         <button type="button" className="btn btn-primary float-end" onClick={deleteLetter}>
                            <i className="fas fa-x"/>
                         </button> }
                </h5>
                <h5 className="card-subtitle text-muted" onClick={()=> goToUsersPublicProfile()}>{languagePreference.by}: {letter.author && letter.author.username}</h5>
                {/*If cap is undefined, substring just gives us the whole string, which is exactly the behavior we want, default to full text. Doesnt break without a default value, so fine with out one I do believe*/}
                <p className="card-text">{letter.text && letter.text.substring(0,charCap)}...</p>
            </div>
            {/*Breaking up the divs allows the image to interject itself as a break between card rows, not sure I like this style prefer an inline profile pic style instead me thinks.*/}
            {/*<svg xmlns="http://www.w3.org/2000/svg" className="d-block user-select-none" width="100%"*/}
            {/*     height="200" aria-label="Placeholder: Image cap" focusable="false" role="img"*/}
            {/*     preserveAspectRatio="xMidYMid slice" viewBox="0 0 318 180"*/}
            {/*     style="font-size:1.125rem;text-anchor:middle">*/}
            {/*    <rect width="100%" height="100%" fill="#868e96"></rect>*/}
            {/*    <text x="50%" y="50%" fill="#dee2e6" dy=".3em">Image cap</text>*/}
            {/*</svg>*/}
            {/*<div className="card-body"> adding an extra div split in here adds a space, which would be occupied by image, but the space seems to remain,
            even if component image is never rendered or even defined it seeams seems.*/}
            {/*    <p className="card-text">{letter.text}</p>*/}
            {/*</div>*/}
            <ul className="list-group list-group-flush">
                <li className="list-group-item">{languagePreference.tags}: {letter.tags && <TagList tagList={letter.tags}/>}</li>
                <li className="list-group-item">{languagePreference.likes}: {letter && letter.likes} {languagePreference.dislikes}: {letter && letter.dislikes}</li>
                <li className="list-group-item">Vestibulum at eros</li>
            </ul>
            <div className="card-body">
                <a href="#" className="card-link">View Details</a>
                <a href="#" className="card-link">Another link</a>
            </div>
            <div className="card-footer text-muted">
                {languagePreference.postedOn}: {letter.date && letter.date.substring(0,10)}
            </div>
            {/*We are always assuming letter is only one long/ one letter, which it always should be, but should we maybe check this somewhere? IDK*/}
            {withReplies && <Replies replies={letter.replies} parentLetter={letter} withEditor={palUserLoggedIn}/>}
        </div>
    )
};

export default LetterListItem;



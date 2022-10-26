import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findAllLetters, createLetter} from "../../actions/letters-action";
import {getLanguage} from "../../actions/language-action";

const WriteLetter = () => {

    const languagePreference = useSelector((state) => state.lang);
    const letters = useSelector((state) => state.letters);
    const profile = useSelector((state) => state.profile);

    const dispatch = useDispatch();

    //For now, a letter will consist of a text attribute which is just a single string, we may need
    //to revamp this later to use an array of strings/ objects instead so that we can do things like
    //individual word highlighting and correction
    //Has to be defined here with a default, instructing it what type it is to be able to use it, so we better hope profile is defined I guess
    //Else without importing mongo I dont know how I would communicate the idea of an ObjectedID, hoping this works. Should this maybe be moved server side?
    //That would also be some sketchy session stuff, not sure if that would be any better, going to sleep on it b/c for now, at the very least documents
    //work and are partially well defined. Yay!!! Goal achieved, steak breakfast tomorow, nice job well done bryson . 
    const [newLetter, setNewLetter] = useState({text: '', author: profile._id});

    const postLetter = () => {
        setNewLetter({...newLetter, author: profile._id});
        console.log(profile._id);
        console.log(profile.username);
        createLetter(dispatch, newLetter);
        //Reset posting field so it is ready and rarring to go again for another letter.
        //add this letter to my user object. How get from reducer? action return something? can do after dispatch? give this letter posted by attribute?
        //Have letter handle adding to my list of things? Really feels like that should be a user responsibility. Maybe instead the user just regularyl polls
        //the list of letters for anyones they posted and adopts them? Who best to handle this?
        setNewLetter({...newLetter, text: ''});
    }

    //using... notation when calling set for now just as a future proofing thing so that if we add other attributes later we don't overwrite them
    //with our new object that I believe set passes. This way it is nice and ready for other attributes in the future.

    //Once on load of page, update all the letters. From there any changes to the reducer will trigger our use selector which selects the prop we are interested in
    //and will give us all that stuff we need then from there and what not ehh?
    useEffect(() => {findAllLetters(dispatch);});

    return(
        <div>
            <h1>{languagePreference.writeALetter}</h1>
            <h1>This is the screen where you can write a letter</h1>
            <div className="md-form ttr-textArea form-floating">
                <textarea className="lg-textarea form-control" id='wal' value={newLetter.text} placeholder={languagePreference.whatDoYouWantToSay}
                          onChange={(event) => setNewLetter({...newLetter, text: event.target.value})}/>
                <label htmlFor='wal'>{languagePreference.whatDoYouWantToSay}?</label>
            </div>
            <button type="button" className="btn btn-primary" onClick={postLetter}>Submit</button>


            {/*/Should be a component later, makes it more reusable later probably too*/}
            <ul className="ttr-tuits list-group">
                {
                    //Checks for definment first me thinks?
                    letters.map && letters.map(letter => {
                        //Should be a component later
                                  return (<h1>{letter.text}</h1>);
                    })

                }
            </ul>
        </div>

    )
};

export default WriteLetter;
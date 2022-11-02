import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {findAllLetters, createLetter} from "../../actions/letters-action";
//import {getLanguage} from "../../actions/language-action";
import LettersList from "./letters-list";
import {calculateNewValue} from "@testing-library/user-event/dist/utils";
import TagList from "./tag-list";
import {useParams} from "react-router-dom";
import Pagination from "../pagination";

const CHAR_CAP = 300;
export const PAGE_SIZE = 7;
const PAGINATIONSTUB = "/appendre/write-letter";

const WriteLetter = () => {

    const languagePreference = useSelector((state) => state.lang);
    const letters = useSelector((state) => state.letters);
    const profile = useSelector((state) => state.profile);

    //How many charcters card preview of letter displays before user must follow document subview to be able to access full text


    const params = useParams();

    const dispatch = useDispatch();

    //For now, a letter will consist of a text attribute which is just a single string, we may need
    //to revamp this later to use an array of strings/ objects instead so that we can do things like
    //individual word highlighting and correction
    //Has to be defined here with a default, instructing it what type it is to be able to use it, so we better hope profile is defined I guess
    //Else without importing mongo I dont know how I would communicate the idea of an ObjectedID, hoping this works. Should this maybe be moved server side?
    //That would also be some sketchy session stuff, not sure if that would be any better, going to sleep on it b/c for now, at the very least documents
    //work and are partially well defined. Yay!!! Goal achieved, steak breakfast tomorow, nice job well done bryson .
    //moving author setting responsibility out of client to server side, maybe will come back to this later, but having too many issues with
    //author OBJECTID type being a mongoose type which does not exist here and in general feel like maybe thats a good sign
    //that we are asking client side to overreach on its repsonisibility here, since its not a field that's really a user input anyway I guess,
    //user doesnt really have a say/ shouldnt really have a say in their username being associated with the message I think.
    //Should we be responsibble for providing the id? I guess that if we provided it as a path/query param, it would still jsut be
    //a string and not an object unless we sent it in body, which would be the same problem of object definition I think?
    const [newLetter, setNewLetter] = useState({text: '', title: '', tags: []});
    const [newTags, setNewTags] = useState({draftedTag: '', addedTags: []});

    const postLetter = async () => {
        // console.log(newLetter.author);

        //going to just call the new approach good for now

        //console.log(profile._id);
        // console.log(profile.username);
        // setNewLetter({...newLetter, author: profile._id});
        // console.log(profile._id);
        // console.log(profile.username);
        // console.log(newLetter.author);
        //tagsToPublish =
        //setNewLetter{}

        console.log(newTags.addedTags, "Added Tags");
        console.log(newLetter.tags, "Letter Tags");
        //interesting, a refeerence variabble is a work around way to directly mutate the current instantiation of you state var,
        //and is independent of the asynchronous setter, and effects what is happening right now.
        //let test = newLetter.tags;
        //push overrides, concat does not.
        newLetter.tags = newTags.addedTags;
        //test.concat(newTags.addedTags);
        console.log(newLetter.tags, "test");
        setNewLetter({...newLetter, tags: newTags.addedTags})
        console.log(newLetter.title, "title before");
        console.log(newLetter.tags);
        await createLetter(dispatch, newLetter, profile);
        //Reset posting field so it is ready and rarring to go again for another letter.
        //add this letter to my user object. How get from reducer? action return something? can do after dispatch? give this letter posted by attribute?
        //Have letter handle adding to my list of things? Really feels like that should be a user responsibility. Maybe instead the user just regularyl polls
        //the list of letters for anyones they posted and adopts them? Who best to handle this?
        //Reset everything after submit so we are ready and raring to go for the next letter.
        await setNewLetter({text: '', tags: [], title: ''});
        await setNewTags({draftedTag: '',addedTags: []});
        console.log(newLetter.title, "title after");
    }

    //using... notation when calling set for now just as a future proofing thing so that if we add other attributes later we don't overwrite them
    //with our new object that I believe set passes. This way it is nice and ready for other attributes in the future. And now it comes into play
    //with title field and such. Thanks for thinking about this Bryson, your welcome Bryson.

    //Once on load of page, update all the letters. From there any changes to the reducer will trigger our use selector which selects the prop we are interested in
    //and will give us all that stuff we need then from there and what not ehh?
    useEffect(() => {
        async function loadLetter (){
            await findAllLetters(dispatch);
        }
        loadLetter();
    }, []);

    //htmlfor and for === same thing???????? hmmmm me no know.

    //all go in form, with form groups just defining grouped together form elements/ components?????

    // const addTag = (newTag) => {
    //     const currentTags = newLetter.tags;
    //     currentTags[currentTags.length - 1] = newTag;
    //     setNewLetter({...newLetter, tags: currentTags});
    //     console.log(currentTags, "addTagHereBoss");
    // }

    const confirmTag = () => {
        //is a reference which also effects the state, not just a value!!!!!!
        const currentTags = newTags.addedTags;
        console.log("0",newTags.addedTags);
        currentTags.push(newTags.draftedTag);
        console.log("1",newTags.addedTags);
        //so ...newTags is the curreent state of the object, including local mods regardless of if they
        //were dont via the change I tink. So ... is same as addedTags: gets, new value
        //so local edited copy is best of both worlds?
        setNewTags({... newTags, draftedTag: ''});
        //doesnt update right away
        console.log(newTags.draftedTag, "draft");
        console.log("2",newTags.addedTags);
        // const currentTags = newLetter.tags;
        // currentTags.push("");
        // setNewLetter({...newLetter, tags: currentTags});
        console.log(currentTags, "confirmTagHereBoss");
    }

    //form group putsa the label with it, input group adds the things on the side, hence why at first the label was trying to render on the side
    //Had to add in some sub groups to address this

    //Put whole div in an expression that says profile && <div> ??? that way jsut like our single letter view element, the thing will just sit as an empty shell until profile
    //loads in, and if it never loads in because you arent logged in, unauthorized users will just not have aceess to anything fun on the page. Its starting to feel
    //to me like that would actually be a really good approach to this. Wanna just try it now?
    //That worked! Yayayayayay! Yea, I quite like that, And i think in this case this high level control makes a lot of sense for what
    //We are are trying to achieve here. nice!
    //Wouldnt even get the button to get here if you were a pal user, but still may want to do that/ this check here maybe again to help prevent
    //Around/ against page/link servers.
    //Like french and english, PEN should probably be a const huh? in case we dedide to expand upon/ change this later maybe, might be a good idea/ practice
    //Just another thing to look at maybe when we are coming through and doing our little clean up here at the end.
    return(<div>{profile.role === "PEN" &&
        <div>
            <h1>{languagePreference.writeALetter}</h1>
            <h1>Need to work on automatic rerouting if state gets undefined.</h1>
            <div className="form-group">
                <label htmlFor='titleField' className="col-form-label mt-4">{languagePreference.title}</label>
                <input className="form-control" id='titleField' value={newLetter.title} placeholder= {languagePreference.title}
                       onChange={(event) => setNewLetter({...newLetter, title: event.target.value})}/>
            </div>
            <div className="md-form ttr-textArea form-floating">
                <textarea className="lg-textarea form-control" id='wal' value={newLetter.text} placeholder={languagePreference.whatDoYouWantToSay}
                          onChange={(event) => setNewLetter({...newLetter, text: event.target.value})}/>
                <label htmlFor='wal'>{languagePreference.whatDoYouWantToSay}?</label>
            </div>
            <div className="form-group">
                <label htmlFor="tagsField" className ="col-form-label mt-4">{languagePreference.tags}</label>
                <div className="input-group">
                    <input className= "form-control" id="tagsField" value={newTags.draftedTag} placeholder={languagePreference.tags}
                           onChange={(event) => setNewTags({...newTags, draftedTag: event.target.value})}/>
                    <button className="btn btn-primary" type="button" id="tagsFieldButton" onClick={confirmTag}>{languagePreference.add}</button>
                </div>
                <TagList tagList={newTags.addedTags}/>
            </div>
            {/*Cols auto, good to know little feature, worked out quite well for us here*/}
            {/*<div className="row-cols-auto">*/}
            {/*    //Lets make this a component that way we can export it and also use it on our cards and on our document reference screen.*/}
            {/*    {newTags.addedTags.map((tag) => {*/}
            {/*        return (<span className="badge rounded-pill bg-primary">{tag}</span>);*/}
            {/*    })}*/}
            {/*</div>*/}

            <button type="button" className="btn btn-primary mt-2" onClick={postLetter}>{languagePreference.post}</button>


            {/*/DONE!Should be a component later, makes it more reusable later probably too*/}
            {letters.length >= 1 && <LettersList
                lettersList = {letters.slice(params.start,params.end)} charCap = {CHAR_CAP}/>}
            {/*No pagination link provided, assumed no pagination wanted to be rendered
            Moving Pagination here to the bottom of the navigating page as opposed to tacking onto the end of the letters-list. Techinically I think both approaches are valid, me attaching it, or having it as an optional feature/
            attribute of the rednered navigable content, so technically I reserve the right to do both, but just going to try it here for now, theoretically it is now ever so slightly more reusable/ less middle man steps to pass stuff around
            and less repeated/ double up calculation maybe? IDK man I don't know.*/}
            {letters.length > 1 && <Pagination linkStub={PAGINATIONSTUB}
                                               listSize={letters.length} elementsPerPage={PAGE_SIZE} currentStartIndex={params.start}/>}
        </div>}</div>

    )
};

export default WriteLetter;
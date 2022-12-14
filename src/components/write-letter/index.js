import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as lettersAction from "../../actions/letters-action";
//not using find all anymore anyway right?
//import {findAllLetters, createLetter} from "../../actions/letters-action";
//import {getLanguage} from "../../actions/language-action";
import TagList from "./tag-list";
import {useNavigate, useParams} from "react-router-dom";
import * as authAction from "../../actions/auth-action"

export const PAGE_SIZE = 7;
export const LETTER_DETAILS_STUB = "/appendre/letterDetails";

//Adding stuff so this same interface can be resused and this same page redirected to to edit a letter
const WriteLetter = () => {

    const languagePreference = useSelector((state) => state.lang);
    const letters = useSelector((state) => state.letters);
    const profile = useSelector((state) => state.profile);

    //How many charcters card preview of letter displays before user must follow document subview to be able to access full text

    const navigate = useNavigate();


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
    //If default is blank this will be blank, else this will be the existing letters stuff right?
    const [newLetter, setNewLetter] = useState({title: '', text: '', tags: []});
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
        //I am now responsible for setting author of this letter, I think that is reasonable especially considering now that the new mentallity is useer
        //writes letter, amkes more snese maybe then letter writing itself? Should this go on server side? Maybe would make it so its impoossible to author a letter when not logged in right?
        let addedLetter = newLetter;
        if(letters[0]) {
            //We have the update letter in this case
            await lettersAction.updateLetter(dispatch, newLetter);
        }
        else {
            //in this case we need the id to be established/ assigned by the service. I think this is fine right?
            //A little hack/ peek behind the curtainy maybe, but I think it should be fine for now, also im tired.
            addedLetter = await authAction.writeLetter(dispatch, profile._id, newLetter);
        }

        //await createLetter(dispatch, newLetter, profile);
        //Reset posting field so it is ready and rarring to go again for another letter.
        //add this letter to my user object. How get from reducer? action return something? can do after dispatch? give this letter posted by attribute?
        //Have letter handle adding to my list of things? Really feels like that should be a user responsibility. Maybe instead the user just regularyl polls
        //the list of letters for anyones they posted and adopts them? Who best to handle this?
        //Reset everything after submit so we are ready and raring to go for the next letter.
        await setNewLetter({text: '', tags: [], title: ''});
        await setNewTags({draftedTag: '',addedTags: []});
        /*Switching to redirecting away to a new model where we direct you to a detailed view for the lettere, so now you can start receiving
        * replies, and edit if you need to. I am starting to think now that maybe that makes more sensee then jsut locking and loading for another reply
        * like we were originally thinking given that these letters should theoretically be a more long involved process maybe right?????????*/
        navigate(`${LETTER_DETAILS_STUB}/${addedLetter._id}`);
        console.log(newLetter.title, "title after");
    }

    //using... notation when calling set for now just as a future proofing thing so that if we add other attributes later we don't overwrite them
    //with our new object that I believe set passes. This way it is nice and ready for other attributes in the future. And now it comes into play
    //with title field and such. Thanks for thinking about this Bryson, your welcome Bryson.

    //Once on load of page, update all the letters. From there any changes to the reducer will trigger our use selector which selects the prop we are interested in
    //and will give us all that stuff we need then from there and what not ehh?
    //This was relevant when we were displaying letters, but no longer right?
    //Should come back is empty if nothing right?
    useEffect(() => {
        async function loadLetter (){
            console.log(params.letterId, "hi its me");
            //update reducer
            if(params.letterId) {
                await lettersAction.findLetterById(dispatch, params.letterId);
            }
        }
        loadLetter();
        const existingLetter = letters[0];
        if(existingLetter && existingLetter._id){
            setNewLetter(existingLetter);
            setNewTags({...newTags, addedTags: existingLetter.tags});
        }
    }, [dispatch, letters, newTags, params.letterId]);

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
        setNewTags({...newTags, draftedTag: ''});
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
    return(
        <div>
            {profile.users === "PenUser" &&
            <div>
                <h1>{languagePreference.writeALetter}</h1>
                {/*<h1>Need to work on automatic rerouting if state gets undefined.</h1>
                I think approach may be shifting from authmatic rerouting to instead just guarding pages against undefined need elements
                like profile and just not rendiering so going to a page manually that you shouldnt be on just doesnt do anything as opposed to dynamically
                throwing you back to the main, I think this may actually bettter to show the page does actually exist, its just not relevant to you yet, i think thats fine right
                that actually reminds me we should add that thing to react router dom someone mentioned before I think back when we were looking at
                query params things where we have a default route. Trying to remeber back now to that tutorial and its all a little foggy, but just talking ot myself
                here im pretty sure the big take away there was just using outlets vs not using outlets for rending content based on having a defined
                query param, kind of like, strike that, very much like what we are doing now for searchees, so we did actually infact end up using that
                one way of doing it/ example from that other online example which we abstracted then I do believe. Nice.*/}
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
                {/*{letters.length >= 1 && <LettersList*/}
                {/*    lettersList = {letters.slice(params.start,params.end)} charCap = {CHAR_CAP}/>}*/}
                {/*No pagination link provided, assumed no pagination wanted to be rendered
                Moving Pagination here to the bottom of the navigating page as opposed to tacking onto the end of the letters-list. Techinically I think both approaches are valid, me attaching it, or having it as an optional feature/
                attribute of the rednered navigable content, so technically I reserve the right to do both, but just going to try it here for now, theoretically it is now ever so slightly more reusable/ less middle man steps to pass stuff around
                and less repeated/ double up calculation maybe? IDK man I don't know.*/}
                {/*{letters.length > 1 && <Pagination linkStub={PAGINATIONSTUB}*/}
                {/*                                   listSize={letters.length} elementsPerPage={PAGE_SIZE} currentStartIndex={params.start}/>}*/}
            </div>}
        </div>

    )
};

export default WriteLetter;
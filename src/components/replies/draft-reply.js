import React, {useState, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as authAction from "../../actions/auth-action"
import * as repliesAction from "../../actions/replies-action"

//Letter is the authoring Letter to which this reply will be bound/ the child of.
const DraftReply = ({parentLetter}) => {

    const languagePreference = useSelector((state) => state.lang);
    //Need profile to pass to write reply method as a signature of sorts I guess for who wrote the reply, will be passed to the service then.
    const profile = useSelector((state) => state.profile);

    const dispatch = useDispatch();

    const [newReply, setNewReply] = useState({text: ''});

    //load in profile JIC since we are using it, even through theroetically and in practice so far the banner
    //Has been handeling it except in certain cases where a refresh isnt done. Log out effects recuder so should effect
    //everything without neededing a recall so shoulndt be a problem. Nice.
    useEffect(() => {
        async function loadProfile (){
            await authAction.getProfile(dispatch);
        }
        loadProfile();
    }, []);

    const submitReply = () => {
        //works well because same dispatch will ultimately be passed along to the letter update method via our reply middle man structure.
        repliesAction.replyToLetter(dispatch, profile, newReply, parentLetter);
        //Reset Text field for a new reply so it is ready and raring to go should we decide to add one.
        setNewReply({...newReply, text: ''});
        //Profile is the author, as we can be very reasonably certain it is the currently logged in Pen user writing this.

    }

    return(
        <div>
            {profile.role === "PAL" &&
             <div>
                 <div className="md-form ttr-textArea form-floating">
                    <textarea className="lg-textarea form-control" id='replyField' value={newReply.text} placeholder={languagePreference.reply}
                          onChange={(event) => setNewReply({...newReply, text: event.target.value})}/>
                     <label htmlFor='replyField'>{languagePreference.reply}</label>
                 </div>
                 <button className= "btn btn-primary" type="button" id="submitReplyButton" onClick={submitReply}>{languagePreference.post}</button>

             </div>}
        </div>
    );

}

export default DraftReply
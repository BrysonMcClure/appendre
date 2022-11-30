import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import * as authAction from "../../actions/auth-action"

const FeedbackEditor = ({profileId, replyId}) => {

    const [newFeedback, setNewFeedback] = useState({text: ''});

    const languagePreference = useSelector((state) => state.lang);

    const dispatch = useDispatch();

    const submitFeedback = () => {
        authAction.provideFeedback(dispatch, profileId, replyId, newFeedback);
        console.log(newFeedback, "newFeedback");
        setNewFeedback({text: ''});
    }

    return(
        <div className="row">
            <div className="md-form ttr-textArea form-floating">
                    <textarea className="lg-textarea form-control" id='replyField' value={newFeedback.text} placeholder={languagePreference.reply}
                              onChange={(event) => setNewFeedback({...newFeedback, text: event.target.value})}/>
                <label htmlFor='replyField'>{languagePreference.reply}</label>
            </div>
            <button type="button" className="btn btn-primary" onClick={submitFeedback}>Add Feedback</button>
            <h1>Feedback</h1>
        </div>
    );
}

export default FeedbackEditor
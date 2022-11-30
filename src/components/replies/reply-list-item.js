import React from "react";
import {useSelector} from "react-redux";
import FeedbackEditor from "./feedback-editor";

const ReplyListItem = ({reply, parentLetter}) => {

    const languagePreference = useSelector((state) => state.lang);

    //Ok to do it here since we dont use it anywhere else yes maybe? idk? hmm maybe? Still hard to determine best places to put things and stuff and what not ehhh?
    //Should this be trickled down from a hihgher place. Idk man i dont freaking now. Not doing a useeffect load here
    //since banner usually takes care of that. I think thats fine right since loading this page should also reload the banner right, maybe not
    //always the case. Works for now but maybe some sort of thing we should protect against just in case and stuff hmmmmmmm?
    const profile = useSelector((state) => state.profile);
    let authorizedToProvideFeedback = true;
    if (profile.users === 'PenUser') {
        //console.log(parentLetter.author, "reply author thingy");
        authorizedToProvideFeedback = profile._id === parentLetter.author._id || parentLetter.author.collaborators.some(e => e.pen === profile._id);
    }
    //const authorizedToProvideFeedback = profile._id === reply.author._id || profile.collaborators.contains({pen : reply.author._id, status: 'ACTIVE'});
    const withFeedbackEditor = profile.users === 'PenUser' && !reply.feedback && authorizedToProvideFeedback;

    return(
        <li className="list-group-item border">
            <h2>{reply.author && reply.author.username} says:</h2>
            <h2>{reply.title}</h2>
            <h2>{reply.text}</h2>
            {withFeedbackEditor && <FeedbackEditor profileId={profile._id} replyId={reply._id}/>}
            {reply.feedback &&
             <div>
                 {/*console.log(reply)*/}
                 {reply.feedback.author && <p>Feedback From: {reply.feedback.author.username}</p>}
                 <p>{reply.feedback.text}</p>
             </div>}
        </li>
    );
}

export default ReplyListItem
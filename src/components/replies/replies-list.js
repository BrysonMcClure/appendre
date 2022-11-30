import React from "react";
import {useSelector} from "react-redux";
import ReplyListItem from "./reply-list-item"

const RepliesList = ({replies, withFeedbackEditor, parentLetter}) => {

    const languagePreference = useSelector((state) => state.lang);
    //argument for making each one of these a card rather than a list item, we could have them in a parent reply elemnt for the replies with editor leter detail screen,
    //but also short circuit that and just return a list of reply cards in a search scenario where you search for replies based on some attribute.

    //Need to add some checks here as we had an issue when a populate was failing in updateone method,
    //this was failing silently, with things like date which was then used as our key property being undefined
    //so i guess it was just like returning nothing instead of erroring out?????????
    return(
        <div className="card-body">
            <h3 className="list-group-item">{languagePreference.replies}: </h3>
            <ul className="list-group list-group-flush m-4">
                {replies && replies.map((reply) => {
                    return(<ReplyListItem reply={reply} withFeedbackEditor={withFeedbackEditor} parentLetter={parentLetter} key={reply.date}/>);
                })}
            </ul>
        </div>
    );
}

export default RepliesList


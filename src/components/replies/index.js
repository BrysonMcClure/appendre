import React from "react";
import RepliesList from "./replies-list";
import DraftReply from "./draft-reply";

const Replies = ({replies, parentLetter, withEditor = false}) => {
    return(
        <div>
            {/*Might wanna handle styling this as a sub card here. Make list of cards instead of just an elongated card list,
            that would require a change to replylistitem, not sure exactly just yet how we want to do that. will play around with the styling a bit more, later,
            once we can see what it looks like*/}
            {withEditor && <DraftReply parentLetter={parentLetter}/>}
            {replies && <RepliesList replies={replies} parentLetter={parentLetter}/>}
            {console.log(parentLetter, "ParentLetter")}
        </div>);

}

export default Replies
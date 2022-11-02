import React from "react";
import {useSelector} from "react-redux";

const ReplyListItem = ({reply}) => {

    const languagePreference = useSelector((state) => state.lang);

    return(
        <li className="list-group-item border">
            <h2>{reply.title}</h2>
            <h2>{reply.text}</h2>
        </li>
    );
}

export default ReplyListItem
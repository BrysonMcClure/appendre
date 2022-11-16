import React from "react";
import * as authAction from "../../../actions/auth-action";
import {useDispatch, useSelector} from "react-redux";

const CollaborateButton = ({profileId, userId}) => {

    const dispatch = useDispatch();

    const languagePreference = useSelector((state) => state.lang);

    const requestCollaboration = () => {
        authAction.requestsCollaboration(dispatch, profileId, userId);
    }

    return(
        <div>
            <button className="btn btn-primary rounded-pill" onClick={requestCollaboration}> {languagePreference.collaborate}</button>
        </div>
    )
}

export default CollaborateButton
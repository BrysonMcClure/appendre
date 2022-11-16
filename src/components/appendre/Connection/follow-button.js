import React from "react";
import * as authAction from "../../../actions/auth-action";
import {useDispatch, useSelector} from "react-redux";

const FollowButton = ({profileId, userId}) => {

    const dispatch = useDispatch();

    const languagePreference = useSelector((state) => state.lang);

    const followPen = () => {

        //authAction.updateUser(dispatch, {...profile, followedPens: followedPensIDs.concat([user._id])});
        authAction.follow(dispatch, profileId, userId);
    }


    return(
        <div>
            <button className="btn btn-primary rounded-pill" onClick={followPen}>{languagePreference.follow}</button>
        </div>
    )
}
export default FollowButton
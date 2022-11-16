import React from "react";
import FollowedListItem from "./followed-list-item";
import {useSelector} from "react-redux";

const FollowedPensList = ({followedList}) => {

    const languagePreference = useSelector((state) => state.lang);

    return(
        <div>
            <h1>{languagePreference.pensIFollow}:</h1>
            <ul className="list-group">
                {
                    followedList && followedList.map((pen) => {
                        return(<FollowedListItem key={pen._id} pen={pen}/>);
                    })
                }
            </ul>
        </div>
    )
}

export default FollowedPensList;
import React from "react";
import {useSelector} from "react-redux";
import FollowedPensList from "./followed-pens-list";
import CollaboratorsList from "./collaborators-list";

const ConnectionsSidebar = () => {

    const profile = useSelector((state) => state.profile);

    return(<div>
        {profile.users === 'PenUser' && <CollaboratorsList collaborators = {profile.collaborators} profile={profile}/>}
        {profile.users === 'PalUser' && <FollowedPensList followedList = {profile.followedPens}/>}
    </div>)
}

export default ConnectionsSidebar
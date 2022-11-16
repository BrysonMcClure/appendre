import React from "react";
import CollaboratorsListItem from "./collaborators-list-item";
import {useSelector} from "react-redux";

const CollaboratorsList = ({collaborators, profile}) => {

    const languagePreference = useSelector((state) => state.lang);

    return(
        <div>
            <h1>{languagePreference.myCollaborators}</h1>
            {collaborators && collaborators.map((collaborator) => {
                return(<CollaboratorsListItem key={collaborator._id} collaborator = {collaborator} profile={profile}/>);
            })}
        </div>
    )
}
export default CollaboratorsList;
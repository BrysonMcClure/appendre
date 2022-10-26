import React from "react";
import {useSelector} from "react-redux";

const CollaboratorList = () => {

    const languagePreference = useSelector((state) => state.lang);

    return(
        <div>
            <h1>{languagePreference.collaborators}:</h1>
        </div>

    )
};

export default CollaboratorList;
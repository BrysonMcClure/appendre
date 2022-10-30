import React from "react";
import {useSelector} from "react-redux";

const CollaboratorList = () => {

    const languagePreference = useSelector((state) => state.lang);

    return(
        <div>
            <h1>{languagePreference.collaborators}: List tbd, should dynamically show a propmt to browse users maybe if no collaborators yet? Would be a very nice polished touch for sure!</h1>
        </div>

    )
};

export default CollaboratorList;
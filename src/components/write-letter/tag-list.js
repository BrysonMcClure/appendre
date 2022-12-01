import React from "react";
//import {useSelector} from "react-redux";

const TagList = ({tagList}) => {

    //const languagePreference = useSelector((state) => state.lang);

    //Want to add an ex button on the editing screen, but i think the best way to do this would require making the draft tags list a reducer
    //So going to just leave them as uneditable and come back to this later. Lot of work, small add, so lower priority right now while we get the rest of the sight set up.

    //rmeber with x we want to set it as a variable to the component, and remeber to have a defualt value like we did with the selected property
    //on the navigation sidebar back in tutier.
    return (
        <div className="row-cols-auto">
            {tagList.map((tag) => {
                return (<span className="badge rounded-pill bg-primary" key={tag + Date.now()}>#{tag}</span>);
            })}
        </div>
    );
}
export default TagList;
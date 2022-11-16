import React from "react";

//its not just conditionally showing components, but also a way of doing guarding against undefined/ not yet loaded in
//elements and stuff.
//Will this be populated? I think so? may need to do a few things first over in dao.
//server should be responsible for returning complete data right? we souldnt have to wrroy about calling a specific
//population or anything once we have the data, theoretically it should just come in all set up hopefully/ theoretically right???????????

const FollowedListItem = ({pen}) => {
    return(
        <div>
            <div className="list-group">
                <a href={`/appendre/profile/${pen._id}`}
                   className="list-group-item list-group-item-action flex-column align-items-start">
                    <div className="d-flex w-100 justify-content-between hstack">
                        <h5 className="mb-1">{pen.username && pen.username}</h5>
                        {/*<small>3 days ago</small>*/}
                        {pen.profilePic && <img className="rounded-circle" width="25%" src={pen.profilePic}/>}
                    </div>
                    {/*<p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas*/}
                    {/*    sed diam eget risus varius blandit.</p>*/}
                    {/*<small>Donec id elit non mi porta.</small>*/}
                </a>
            </div>
        </div>
    )
}

export default FollowedListItem
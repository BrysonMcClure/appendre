import React from "react";
import * as authAction from "../../../../actions/auth-action"
import {useDispatch} from "react-redux";

const CollaboratorsListItem = ({collaborator, profile}) => {

    const dispatch = useDispatch();

    const acceptCollaboration = () => {
        console.log(collaborator.pen._id, "penU=iD");
        authAction.acceptCollaboration(dispatch, profile._id, collaborator.pen._id);
    }

    return(
        <div>
            <div>
                <div className="list-group">
                    <a href={`/appendre/profile/${collaborator.pen && collaborator.pen._id}`}
                       className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex w-100 justify-content-between hstack">
                            <h5 className="mb-1">{collaborator.pen.username && collaborator.pen.username}</h5>
                            {/*<small>3 days ago</small>*/}
                            {collaborator.pen.profilePic && <img className="rounded-circle" width="25%" src={collaborator.pen.profilePic}/>}
                        </div>
                        <h2>{collaborator.status && collaborator.status}</h2>
                        {/*<p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas*/}
                        {/*sed diam eget risus varius blandit.</p>*/}
                        {/*<small>Donec id elit non mi porta.</small>*/}
                    </a>
                    {collaborator.status === 'REQUESTED' && <button className="btn btn-primary" onClick={acceptCollaboration}>Accept</button> }
                </div>
            </div>
        </div>
    );
}
export default CollaboratorsListItem;
import React from "react";
import {useSelector} from "react-redux";

const UserListItem = ({user}) => {

    const languagePreference = useSelector((state) => state.lang);

    return(
        <div className="card">
            <div className="card-body">
                <div className="row">
                    <div className="col-9">
                        <h4 className="card-title">{user && user.username}</h4>
                        <h6 className="card-subtitle mb-2 text-muted">{user && user.role}</h6>
                        <p className="card-text">Friends List here.</p>
                        <a href={`/appendre/profile/${user._id}`} className="card-link">{languagePreference.viewProfile}</a>
                    </div>
                    <div className="col-3">
                        {user.profilePic && <img className="rounded-circle card-image" width="100%" src={user.profilePic}/>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserListItem
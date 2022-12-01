import React from "react";
import UserListItem from "./user-list-item";

const UsersList = ({usersList = []}) => {
    //const languagePreference = useSelector((state) => state.lang);
    return(
        <div>
            {console.log(usersList)}
            <ul className="list-group">
                {
                    usersList && usersList.map((user) => {
                        return(<UserListItem key={user._id} user={user}/>);
                    })
                }
            </ul>
        </div>
    );
}

export default UsersList
import React from "react";
import {useSelector} from "react-redux";
//import * as authAction from "../../../actions/auth-action";
import Connection from "../Connection";

const UserListItem = ({user}) => {

    const languagePreference = useSelector((state) => state.lang);

    //should we call or get passed this? hmmmmmm, i think we can do this here maybe.
    const profile = useSelector((state) => state.profile);

    //const dispatch = useDispatch();

    //Kinda duct-tapey. would prefer not to have to pull back the curtain. but this is a problem
    //with populations and full author objects. Wiat, what if we just added user? hmm. i feel like actually that
    //kinda breaeks the model. turns followed list from a list of id references into a list of actualy objects with breaks a lot of things,
    // because then either way the problem remains the way
    //update works setting a prop to the provided one. We maybe need a special add one thing or something. idk.
    //For now sticking with this.
    let followedPensIDs = [];
    if(profile.users === 'PalUser'){
        followedPensIDs = profile.followedPens.map((pen) => {
        if(pen._id) {
            return pen._id
        }
        return 1;
    });}

    //let collaboratorsIDs = [];
    let collabStatus;
    //Should maybe be made into a for in instead of using map in this way maybe?
    //like idk man but maybe map in this way might cause unexpected problem or something ehh?
    if(profile.users === 'PenUser') {
        profile.collaborators.map((collaborator) => {
            if(collaborator.pen._id === user._id) {
                console.log(collaborator, "fired");
                collabStatus = collaborator;
            }
            return collaborator.pen._id
        })
    }


    // const followed = followedPensIDs.includes(user._id);
    // // const collaboratorsIDsOnly = collaboratorsIDs.map((collab) => {
    // //     return collab.pen;
    // // })
    // //const collabInitiated = collaboratorsIDs.includes({pen: user._id, status: {}});
    //
    // const followPen = () => {
    //     //should be safe as we protect against this button firing when profile is not a pal
    //     //only can follow someone when logged in right? makes sense right?
    //     //Checking first if user is already following this pen
    //     //actually button just shouldnt render then right?
    //     //if(!profile.followedPens.includes(user._id)) {
    //         authAction.updateUser(dispatch, {...profile, followedPens: followedPensIDs.concat([user._id])});
    //     //}
    //     //otherwise do nothing right?
    //     //d-grid vs d-flex???? what s d???
    // }

    // const requestCollaboration = () => {
    //     // const newCollab = {
    //     //     pen: user._id,
    //     //     status: "PENDING"
    //     // }
    //     // const collabRequest = {
    //     //     pen: profile._id,
    //     //     status: "Requested"
    //     // }
    //     // authAction.updateUser(dispatch, {...profile, collaborators: collaboratorsIDs.concat([newCollab])});
    //     // userService.updateUser({...user, collaborators: user.collaborators.concat([collabRequest])});
    //     authAction.requestsCollaboration(dispatch, profile._id, user._id);
    // }

    //const collaborationPossible = (user.users === 'PenUser' && profile.users === 'PenUser' && !collabStatus && user._id !== profile._id);

    return(
        <div className="card">
            {console.log(profile.role === 'PAL' && profile.followedPens, "followed Pens")}
            <div className="card-body">
                <div className="row justify-content-between d-flex">
                    <div className="col">
                        <h4 className="card-title">{user && user.username}</h4>
                        <h6 className="card-subtitle mb-2 text-muted">{user && user.role}</h6>
                        <p className="card-text">Friends List here.</p>
                        <a href={`/appendre/profile/${user._id}`} className="card-link">{languagePreference.viewProfile}</a>
                    </div>
                    <div className="col">
                        <div className="float-end vstack">
                            {user.profilePic && <img className="rounded-circle card-image float-end" width="50%" src={user.profilePic} alt={languagePreference.profilePic}/>}
                            {/*{followed && <p>Following <i className="fas fa-check"></i></p>}*/}
                            {/*{(collabStatus && collabStatus.status === 'PENDING') && <p>Request Pending</p>}*/}
                            {/*{(collabStatus && collabStatus.status === 'ACTIVE') && <p>Active Collaborator</p>}*/}
                            {/*/!*Only show the button when we are a logged in Pal, and the person on the list is a pal, only then can we follow them*/}
                            {/*having the () at the end meant the follow button was constantly getting pressed. Why does this happen again? idk,*/}
                            {/*but good to watch out for when having no arguments i guess it is some sort of open thing maybe like a semicolon after*/}
                            {/*a for loop or something like that maybe? idk man.*!/*/}
                            {/*/!*Fundamentally changing this from checking role prop we added, to using the .users property that the discriminator adds*/}
                            {/*for us autmatically to denote that this object is a sub set of the users class. This wound up being a big issue with some users*/}
                            {/*being unfollowable, because when we went to go populate some old users who were created before that distinction was created, but after roles were added,*/}
                            {/*populate just returned null. In this case of following a pen user, this meant they just werent added to the returned array, thus effectivley making the action do*/}
                            {/*nothing which is the behavior that which we were observing. And in the case of collaborating it populated the status, but not the user part got populated as null,*/}
                            {/*and then us sending that back resulted in a stuck pattern. We also learned these sub objects get Ids interstingly enough. I think/ it seems according to the tinternet*/}
                            {/*this is a way for mongoose to know which sub record to modify. Good to know the null behavior of populate as well in any case. This new check help prevents against*/}
                            {/*those old records becoming problamatic by just making them un clickable/ followable/ collaboratable for now. Eventually/ in production those records should theoretically not be possible.*/}
                            {/*also, no big difference in setting it up this way and arguablly a little more robust maybe?*!/*/}
                            {/*{(user.users === 'PenUser' && profile.users === 'PalUser' && !followed) && <FollowButton profileId={profile._id} userId={user._id}/>}*/}
                            {/*{(collaborationPossible) && <CollaborateButton profileId={profile._id} userId={user._id}/>}*/}
                            {/*Connections only relavent when logged in, so we can porobably reasonably just nip that in the but right here.*/}
                            {profile.username && <Connection profile={profile} user={user}/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserListItem
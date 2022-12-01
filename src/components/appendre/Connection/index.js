import React from "react";
import {useSelector} from "react-redux";
import FollowButton from "./follow-button";
import CollaborateButton from "./collaborate-button";

const Connection = ({profile, user}) => {

    const languagePreference = useSelector((state) => state.lang);

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

    if(profile.users === 'PenUser') {
        // collaboratorsIDs = profile.collaborators.map((collaborator) => {
        //     if(collaborator.pen._id == user._id) {
        //         console.log(collaborator, "fired");
        //         collabStatus = collaborator;
        //     }
        //     return collaborator.pen._id
        // })
        for (const collaborator of profile.collaborators) {
            if(collaborator.pen._id === user._id) {
                collabStatus = collaborator;
            }
        }
    }

    const collaborationPossible = (user.users === 'PenUser' && profile.users === 'PenUser' && !collabStatus && user._id !== profile._id);

    const followed = followedPensIDs.includes(user._id);

    return(
        <div>
            {followed && <h3>Following <i className="fas fa-check"></i></h3>}
            {(collabStatus && collabStatus.status === 'PENDING') && <p>{languagePreference.requestPending}</p>}
            {(collabStatus && collabStatus.status === 'ACTIVE') && <p>{languagePreference.activeCollaborator}</p>}
            {(collabStatus && collabStatus.status === 'REQUESTED') && <p>{languagePreference.pendingYourApproval}</p>}
            {/*Only show the button when we are a logged in Pal, and the person on the list is a pal, only then can we follow them
                            having the () at the end meant the follow button was constantly getting pressed. Why does this happen again? idk,
                            but good to watch out for when having no arguments i guess it is some sort of open thing maybe like a semicolon after
                            a for loop or something like that maybe? idk man.*/}
            {/*Fundamentally changing this from checking role prop we added, to using the .users property that the discriminator adds
                            for us autmatically to denote that this object is a sub set of the users class. This wound up being a big issue with some users
                            being unfollowable, because when we went to go populate some old users who were created before that distinction was created, but after roles were added,
                            populate just returned null. In this case of following a pen user, this meant they just werent added to the returned array, thus effectivley making the action do
                            nothing which is the behavior that which we were observing. And in the case of collaborating it populated the status, but not the user part got populated as null,
                            and then us sending that back resulted in a stuck pattern. We also learned these sub objects get Ids interstingly enough. I think/ it seems according to the tinternet
                            this is a way for mongoose to know which sub record to modify. Good to know the null behavior of populate as well in any case. This new check help prevents against
                            those old records becoming problamatic by just making them un clickable/ followable/ collaboratable for now. Eventually/ in production those records should theoretically not be possible.
                            also, no big difference in setting it up this way and arguablly a little more robust maybe?*/}
            {(user.users === 'PenUser' && profile.users === 'PalUser' && !followed) && <FollowButton profileId={profile._id} userId={user._id}/>}
            {(collaborationPossible) && <CollaborateButton profileId={profile._id} userId={user._id}/>}
        </div>
    )
}

export default Connection
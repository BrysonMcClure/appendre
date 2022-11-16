import * as usersService from "../services/users-service"
//This whole thing is going to go away, the only thing that should ever touch the reducer for users from now on is going to be
//authenticaiton controller, maybe should be more apptly named profile/usersession, but none-theless.
export const UPDATE_USER = 'UPDATE_USER';

export const updateUser = async (dispatch, user) => {
    const response = await usersService.updateUser(user);
    console.log(response, "response");
    if (response.modifiedCount === 1){
        //populate reasons for populating the new friend added for example beyond just the Id or whatever.
        const updatedUser = await usersService.findUserById(user._id);
        dispatch({
            type: UPDATE_USER,
            updatedUser
        });
    }
    return response;
}

export const followPen = async (dispatch, palUser, penToFollowId) => {
    //palUser.followedPens.push(penToFollowId);
    //Does pal user stick around as some sort of refernce, does modifying it as opposed to using
    //The spread operator unintentionally mutatue its parent? In this case a local reference to the state
    //that isnt getting overridden since we arent pulling from the reducer which would override it?
    //hmm, i wonder, how else would it be remaining persistent/continuing to add followed pens?
    //maybe thats a thing since this is functional and i guess a ref object. hmmm. important to
    //watch out for maybe when passing values around like this. theoretically  i guess we really
    //only want the server and the reducer modifiying vars like this, and the files just reading it.
    //important to watch out for. lets try it with the spread operator maybe and see what happens?
    //palUser.followedPens.push(penToFollowId);
    console.log(palUser, "pre-adding pen");
    //Using concat to be very careful about mutating existing array. hmm, still modifying? shouldnt this be creating a new obbjecT???
    const response = await updateUser(dispatch, {...palUser, followedPens: palUser.followedPens.concat([penToFollowId])});
    console.log("after calling update user");
}

//never mind not doing this, this is ok to put in our service, but does not belong in the action!
//that would need to be in something seperate for a list of users results concept. We dont want to
//have a serach messing with who is logged in. this is a fine line to be walking. THere is someoverlap
//with the service and the crud operations because profile is a user after all, but its important this action
//only deals with the logged in user. If needed we could always make another updateUser thing later,
//but also as for now its only used in one place, so sticking with just using the state thingy like we actually used to do with
//profile back when it was just a proof of concept and only used in one place, which is arguably an approrpiate usage of state in that case then.
// export const findUserById = async (dispatch, uid) => {
//     const response = usersService.findUserById(uid);
//     dispatch({
//         type:
//              })
// }
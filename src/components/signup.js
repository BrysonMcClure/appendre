import {useEffect, useState, React} from "react";
import {useNavigate} from "react-router-dom";
import * as authService from "../services/auth-service";

const SignUp = () => {
    const navigate = useNavigate();

    //Local state var with getter and setter + default value
    //Setting default field values for user obj
    const [newUser, setNewUser] = useState({username:'', password:''});
    const [usernameFormLabel, setUsernameFormLabel] = useState({text:''});
    const [usernameStyling, setUsernameStyling] = useState({text:''});
    const [usernameFormStyling, setUsernameFormStyling] = useState({text:''});

    const signUpPressed = () => {
        //This one is fine since its not actually responsible for returning anything
        authService.signup(newUser).then(() => navigate('/appendre/profile')).catch((e) => alert('Username already in use'));
        //Lookinto custom alerts later
        // <div className="alert alert-dismissible alert-danger">
        //     <button type="button" className="btn-close" data-bs-dismiss="alert"></button>
        //     <strong>Username is already in use, please try again</strong>
        // </div>
    }

    //let usernameStyling = '';
    //let usernameFormStyling = '';
    //let usernameFormLabel = '';


//Potentially not the best way to do this as there is a lot of state manipulation. Will maybe want to lookinto using a reducer or
    //condtionally css combined with html form validation, but for now this is a lovely proof of concept and a huge improvement over
    //having to each time push submit to be told username is invalid. definitley a professional touch and
    //the "polished" type of look we are going for!
    const checkUserNameAvailability = () => {
        //setNewUser({...newUser, username: username.target.value});
        async function checkName () {
            const response = await authService.checkUsernameAvailability(newUser);
            console.log(response);
            if(response) {
                setUsernameFormLabel({text: "Username Already Taken"});
                setUsernameStyling({text: 'is-invalid'});
                setUsernameFormStyling({text: 'has-danger'});
            } else {
                setUsernameFormLabel({text: "Username Valid!"});
                setUsernameStyling({text: 'is-valid'});
                setUsernameFormStyling({text: 'has-success'});
            }
        }
        checkName();
    }

    useEffect(checkUserNameAvailability, [newUser.username]);

    return(
        <div>
            {/*<div className= >*/}
            {/*    <label className="form-label mt-4" htmlFor="inputInvalid">Username</label>*/}
            {/*    <input type="text" placeholder="Username" className={`form-control ${usernameStyling}`}*/}
            {/*           id="inputInvalid" onChange={(username) => checkUserNameAvailability(username)}/>*/}
            {/*    <div className="invalid-feedback">${usernameFormLabel}</div>*/}
            {/*</div>*/}
            <h1>Sign Up</h1>
            <form className= {`form-group ${usernameFormStyling.text}`}>
                <label className="col-form-label mt-4" htmlFor="inputUsername">Username</label>
                <input type="text" className={`form-control ${usernameStyling.text}`} placeholder="Username"
                       id="inputUsername" onChange={(username) => setNewUser({...newUser, username: username.target.value})}/>
                <div> {usernameFormLabel.text} </div>
                {/*Additional form control needed for non-empty fields. Although once "" "" is taken techincally its not possible. May also want to add password restrictions for more of a polished look*/}
                <label className="col-form-label mt-4" htmlFor="inputPassword">Password</label>
                <input type="password" className="form-control" placeholder="Password"
                       id="inputPassword" onChange={(e) => setNewUser({...newUser, password: e.target.value})}/>
            </form>
            {/*Can make this a more complex variable for checking other field characteristics. Should be disabled if username is not valid since we are doing that now. Cleaner approach over alerting that it didnt work, preventing the mistake in the first place I think would be preferable.*/}
            <button type="button" className={`btn btn-primary ${newUser.password === '' ? 'disabled' : ''}`} onClick={signUpPressed}>SignUp</button>
        </div>
    )
};

export default SignUp;
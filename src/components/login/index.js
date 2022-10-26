import {useNavigate} from "react-router-dom";
import * as authService from "../../services/auth-service";
import React, {useState} from "react";
import {useSelector} from "react-redux";
//Default import would be imported files default export?
//React components are wrapped in a function, and are not just html directly i/Me me thinks
const Login = () => {
    const[loginUser, setLoginUser] = useState({username: '', password: ''});
    const languagePreference = useSelector((state) => state.lang);
    const navigate = useNavigate();
    const login = () => {
        authService.login(loginUser).then((user) => navigate('/appendre/profile')).catch(e => alert("The username and password entered do not match our records. Please check what you entered and try again"));
    }
    return (
        <div>
            <h1>{languagePreference.login}</h1>
            <form className="form-group">
                <label className="col-form-label mt-4" htmlFor="inputUsername">{languagePreference.username}</label>
                <input type="text" className="form-control" placeholder={languagePreference.username} id="inputUsername" onChange={(e) => setLoginUser({...loginUser, username: e.target.value})}/>
                <label className="col-form-label mt-4" htmlFor="inputPassword">{languagePreference.password}</label>
                <input type="password" className="form-control" placeholder={languagePreference.password} id="inputPassword" onChange={(e)=> setLoginUser({...loginUser, password: e.target.value})}/>
                <button type="button" className="btn btn-primary" onClick={login}>{languagePreference.login}</button>
            </form>

        </div>
    )
    return(<h1>test</h1>);
};

export default Login;
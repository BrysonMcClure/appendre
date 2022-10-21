import {useNavigate} from "react-router-dom";
import * as authService from "../../services/auth-service";
import React, {useState} from "react";
//Default import would be imported files default export?
//React components are wrapped in a function, and are not just html directly i/Me me thinks
const Login = () => {
    const[loginUser, setLoginUser] = useState({username: '', password: ''});
    const navigate = useNavigate();
    const login = () => {
        authService.login(loginUser).then((user) => navigate('/profile')).catch(e => alert("The username and password entered do not match our records. Please check what you entered and try again"));
    }
    return (
        <div>
            <h1>Login</h1>
            <input type="text" onChange={(e) => setLoginUser({...loginUser, username: e.target.value})}/>
            <input type="password" onChange={(e)=> setLoginUser({...loginUser, password: e.target.value})}/>
            <button type="button" className="btn btn-primary" onClick={login}>Login</button>
        </div>
    )
    return(<h1>test</h1>);
};

export default Login;
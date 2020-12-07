import React, {useState} from "react";
import useRequest from '../hooks/use-request'
import Router from "next/router";

const LoginSignUp = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {doRequest, errors} = useRequest({
        url: '/api/users/signin',
        method: 'post',
        body: {
            email,
            password
        },
        onSuccess: () => {
            Router.push('/')
        }
    });
    const signupReq = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email,
            password
        },
        onSuccess: () => {
            Router.push('/')
        }
    });
    const doReqSignup = signupReq.doRequest
    const signupErr = signupReq.errors
    const handleSignup = async () => {
        await doReqSignup();
    }
    const handleLogin = async () => {
        await doRequest();
    }
    return (
        <div className="login-div">
            <div className="fields">
                <div className="username">
                    <input type="email"
                           value={email}
                           className="user-input"
                           onChange={e => setEmail(e.target.value)}
                           placeholder="email"/></div>
                <div className="password">
                    <input type="password"
                           value={password}
                           className="pass-input"
                           onChange={e => setPassword(e.target.value)}
                           placeholder="password"/></div>
            </div>
            {errors}
            {signupErr}
            <button onClick={handleLogin} className="signin-button">Login</button>
            <button onClick={handleSignup} style={{background: '#ff99ff'}} className="signin-button">Signup</button>
        </div>
    )
}
export default LoginSignUp
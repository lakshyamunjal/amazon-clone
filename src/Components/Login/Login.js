import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { constants } from '../../constants';
import { authetication } from '../../firebase';
import classes from './Login.module.css';

function Login() {

    const history = useHistory();
    const loginErrorMessage = (<p className={classes.ErrorMessage}>Invalid username/password</p>);
    const registerErrorMessage = (<p className={classes.ErrorMessage}>Email id already in use!</p>);
    const invalidEmailErrorMessage = (<p className={classes.ErrorMessage}>Invalid email id!</p>);

    // bootstrap spinner
    const loginSpinner = (
        <div className="spinner-border text-light spinner-border-sm" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    );

    const registerSpinner = (
        <div className="spinner-border text-warning spinner-border-sm" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    );


    // state in Functional components
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoginSpinner, setShowLoginSpinner] = useState(false);
    const [showRegisterSpinner, setShowRegisterSpinner] = useState(false);

    const [isValidUser, setValidUser] = useState(true);
    const [isNewUser, setNewUser] = useState(true);
    const [isValidEmailForRegistration, setValidEmailForRegistration] = useState(true);

    const signIn = (event) => {
        setNewUser(true);       // hide register error message if visible
        setValidEmailForRegistration(true);     // hide invalid email error message if visible
        setShowLoginSpinner(true);

        // by default, page will refresh because this function is linked to a button inside a form
        event.preventDefault();     // prevents the page to refresh
        //console.log(`Email: ${email}, Password: ${password}`);

        //authetication will happen here!
        const promise = authetication.signInWithEmailAndPassword(email, password);
        promise.then(resp => {
            history.push('/');
        }).catch(err => {
            setValidUser(false);
            setShowLoginSpinner(false);
            console.log(err);
        });
    }

    const register = () => {
        setValidUser(true);
        setShowRegisterSpinner(true);

        // move to registration page
        const promise = authetication.createUserWithEmailAndPassword(email, password);
        promise.then(response => {
            console.log(response);
            if (response) {
                history.push('/');
            }
        }).catch(err => {
            if (err.message.includes("badly formatted")) {
                // invalid email
                console.log("Invalid emaild");
                setValidEmailForRegistration(false);
            }

            if (err.message.includes("another account")) {
                // email id already in use
                console.log("Duplicate email");
                setValidEmailForRegistration(false);
                setNewUser(false);
            }

            setShowRegisterSpinner(false);
            console.log(err.message);
        })

    }

    const hideErrorMessage = () => {
        setValidUser(true);
        setNewUser(true);
        setValidEmailForRegistration(true);
    }

    return (
        <div className={classes.Login}>
            <Link to='/'>
                <img src={constants.amazonLogoURL} className={classes.Logo} alt="Amazon logo" />
            </Link>
            <div className={classes.LoginContainer}>
                <h1>Sign In</h1>
                <form>
                    <h5>Email</h5>
                    <input type='text'
                        placeholder='Enter email'
                        value={email} // connects this input field with state
                        onFocus={hideErrorMessage}        // hide error message
                        onChange={(event) => { setEmail(event.target.value) }} />

                    <h5>Password</h5>
                    <input type='password'
                        placeholder='Enter Password'
                        value={password}
                        onFocus={hideErrorMessage}        // hide error message
                        onChange={(event) => { setPassword(event.target.value) }} />
                    <br />

                    <button
                        className={classes.SignIn}
                        onClick={signIn}
                        disabled={showLoginSpinner}>
                        {showLoginSpinner ? loginSpinner : "Sign In"}
                    </button>

                    {isValidUser == false ? loginErrorMessage : null}
                    <br />
                </form>
            </div>
            <p className={classes.NewUser}>New to Amazon ?</p>

            <button id='registerButton'
                className={classes.Register}
                onClick={register}
                disabled={showRegisterSpinner}
            >{showRegisterSpinner ? registerSpinner : "Create your amazon account"}</button>

            {isNewUser == false ? registerErrorMessage : isValidEmailForRegistration == false ? invalidEmailErrorMessage : null}
            <br />
        </div>
    )
}

export default Login;
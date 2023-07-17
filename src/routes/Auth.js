import { GithubAuthProvider, GoogleAuthProvider, auth, createUserWithEmailAndPassword, getRedirectResult, signInWithEmailAndPassword, signInWithPopup, signInWithRedirect } from 'myFb';
import React, { useState } from "react";


const Auth = () => {
    const [form, setForm] = useState({email: "", password: ""});
    const [isNewAccount, setIsNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = ({target: {name, value}})=> setForm({...form, [name]: value})

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            if(isNewAccount) {
                const data = await createUserWithEmailAndPassword(auth, form.email, form.password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    // console.log(user);
                })
            } else {
                await signInWithEmailAndPassword(auth, form.email, form.password)
                .then((userCredential)=> {
                    const user = userCredential.user;
                })   
            }
        } catch (err) {
            setError(err.message); 
        }
        
    }

    const toggleAccount = () => setIsNewAccount(prev => !prev);

    const onSocialClick = async (event) => {
        const {target: { name }} = event;
        // Sign in using a popup.
        let provider;
        if(name ==='google') {
            // Sign in using a popup.
            provider = new GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            const result = await signInWithPopup(auth, provider);

            // The signed-in user info.
            const user = result.user;
            // This gives you a Google Access Token.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

        } else if(name === 'github') {
            // Sign in using a popup.
            provider = new GithubAuthProvider();
            provider.addScope('repo');
            const result = await signInWithPopup(auth, provider);

            // The signed-in user info.
            const user = result.user;
            // This gives you a Github Access Token.
            const credential = GithubAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;

        }
    }

    return (
    <div>
        <form onSubmit={onSubmit}>
            <input type='text' name='email' placeholder='Email' required onChange={onChange}/>
            <input type='password' name='password' placeholder='Password' required onChange={onChange}/>
            <input type='submit' value={isNewAccount ? 'Create New Account':'Sign in'} />
            {error}
        </form>
        <span onClick={toggleAccount}>{!isNewAccount ? 'Create New Account':'Sign in'}</span>
        
        <button name='google' onClick={onSocialClick}>Continue with Google</button>
        <button name='github' onClick={onSocialClick}>Continue with Github</button>
    </div>

    )

};

export default Auth;
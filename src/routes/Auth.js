import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'myFb';
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
                    console.log(user);
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

    return (
    <div>
        <form onSubmit={onSubmit}>
            <input type='text' name='email' placeholder='Email' required onChange={onChange}/>
            <input type='password' name='password' placeholder='Password' required onChange={onChange}/>
            <input type='submit' value={isNewAccount ? 'Create New Account':'Sign in'} />
            {error}
        </form>
        <span onClick={toggleAccount}>{!isNewAccount ? 'Create New Account':'Sign in'}</span>
        
        <div>
            <button>Continue with Google</button>
            <button>Continue with Github</button>
        </div>
    </div>

    )

};

export default Auth;
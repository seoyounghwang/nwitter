import { auth } from 'myFb';
import React from "react";

const Profile = () => {
    const onSignout = () => {
        auth.signOut();
    }
    return (
        <>
        <button onClick={onSignout}>Sign Out</button>
        </>
    )
}
export default Profile;
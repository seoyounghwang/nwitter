import { HashRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "routes/Home";
import Auth from "routes/Auth";
import Navigation from './Navigation';
import Profile from 'routes/Profile';
import EditProfile from 'routes/EditProfile';

const AppRouter =  ({isLoggedIn, userObj}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation/>}
            <Routes>
                {isLoggedIn ? 
                (<>
                <Route exact path="/" element={<Home userObj={userObj}/>}/>
                <Route exact path="/profile" element={<Profile/>}/>
                <Route exact path="/editprofile" element={<EditProfile/>}/>
                </>)
                : 
                (<Route exact path="/" element={<Auth/>}/>)}
                <Route path='*' element={<Navigate to='/' />} />
            </Routes>
        </Router>
    )
}

export default AppRouter;
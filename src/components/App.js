import { useEffect, useState } from 'react';
import './App.css';
import AppRouter from 'components/Router';
import {auth} from 'myFb';

function App() {

  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  const [userObj, setUserObj] = useState(null);
  useEffect(()=> {
    auth.onAuthStateChanged((user)=>{
      if(user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  },[])
  return (
    <div className="App">
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={userObj}/>: "Initializing...."}
    </div>
  );
}

export default App;

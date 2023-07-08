import { useState } from 'react';
import './App.css';
import AppRouter from 'components/Router';
import {auth} from 'myFb';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(auth.currentUser);
  return (
    <div className="App">
      <AppRouter isLoggedIn={isLoggedIn}/>
    </div>
  );
}

export default App;

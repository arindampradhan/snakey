import { useState } from "react";
import "./App.css";
import Game from './components/Game'
import Login from './components/Login'
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  const handleLogin = () => {
    setIsLoggedIn(true);
  }
  
  if(isLoggedIn) {
    return <Game />
  }
  return <Login onClick={handleLogin} />
};

export default App;

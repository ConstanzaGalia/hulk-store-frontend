import { Route, Switch } from 'react-router';
import Home from '../Components/Home/Home';
import '../styles/home.css';
import '../styles/login-register.css';
import Register from '../Components/Login-Registrer/Register';
import {useState} from 'react';

const Routes = () => {
  const [user, setUser] = useState({});

  const handleUserLogin = (user) => {
    setUser(user);
  };
  console.log(user);
  return (  
    <Switch>
      <Route path='/register'> 
        <Register handleUserLogin={handleUserLogin}/>
      </Route>
      <Route path='/'> 
        <Home user={user}/>
      </Route>
    </Switch>
  )
}

export default Routes;
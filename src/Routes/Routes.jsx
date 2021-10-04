import { Route, Switch } from 'react-router';
import Home from '../Components/Home/Home';
import '../styles/home.css';
import '../styles/login-register.css';
import '../styles/admin.css';
import Register from '../Components/Login-Registrer/Register';
import AdminRoutes from '../Components/PanelAdmin/AdminRoutes';
import Cart from '../Components/ShoppingCart/Cart';
import {useState} from 'react';
import {getLocalStorage} from '../Components/localStorageHelper/localHelper';

const Routes = () => {
  const [user, setUser] = useState(getLocalStorage('user'));

  const handleUserLogin = (user) => {
    setUser(user);
  };
  return (  
    <Switch>
      <Route path='/cart'> 
        <Cart handleUserLogin={handleUserLogin} user={user}/>
      </Route>
      <Route path='/panelAdmin'> 
        <AdminRoutes handleUserLogin={handleUserLogin} user={user}/>
      </Route>
      <Route path='/register'> 
        <Register handleUserLogin={handleUserLogin}/>
      </Route>
      <Route path='/'> 
        <Home user={user} handleUserLogin={handleUserLogin}/>
      </Route>
    </Switch>
  )
}

export default Routes;
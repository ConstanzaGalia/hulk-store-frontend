import { Route, Switch } from 'react-router';
import PanelAdmin from './PanelAdmin';
import {Redirect, useRouteMatch} from 'react-router-dom';
import Products from './Products';

const AdminRoutes = ({handleUserLogin, user}) => {
  const {path} = useRouteMatch();
  if (!user || user.role !== "admin") {
    return <Redirect to="/" />;
  }
  return (  
    <Switch>
      <Route path={`${path}/nuevoProducto`}> 
        <Products handleUserLogin={handleUserLogin}/>
      </Route>
      <Route path={path}> 
        <PanelAdmin handleUserLogin={handleUserLogin}/>
      </Route>
    </Switch>
  )
}

export default AdminRoutes;
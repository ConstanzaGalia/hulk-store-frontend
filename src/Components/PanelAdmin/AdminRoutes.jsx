import { Route, Switch } from 'react-router';
import PanelAdmin from './PanelAdmin';
import {Redirect} from 'react-router-dom';

const AdminRoutes = ({handleUserLogin, user}) => {
  if (!user || user.role !== "admin") {
    return <Redirect to="/" />;
  }
  return (  
    <Switch>
      <Route path='/'> 
        <PanelAdmin handleUserLogin={handleUserLogin}/>
      </Route>
    </Switch>
  )
}

export default AdminRoutes;
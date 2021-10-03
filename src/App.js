import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes/Routes';
import 'antd/dist/antd.css';

function App() {
  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;

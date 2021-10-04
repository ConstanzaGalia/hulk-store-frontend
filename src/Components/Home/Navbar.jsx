import { Row, Col, Button } from "antd";
import LogoNavbar from "../../img/logo.png";
import {
  UserAddOutlined,
  LoginOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { removeLocalStorage } from "../localStorageHelper/localHelper";
import {useState} from 'react';
import LoginModal from '../Login-Registrer/LoginModal';

const Navbar = ({ user, handleUserLogin}) => {
  const history = useHistory();
  const [modalLogin, setModalLogin] = useState(false);
  const handleToggleLogin = () => setModalLogin((state) => !state)

  const logout = () => {
    removeLocalStorage('token');
    removeLocalStorage("user");
    handleUserLogin(null);
    history.push('/');
    window.scrollTo(0, 0);
  }

  const goToCart = () => {
    history.push('/cart');
  }

  return (
    <>
      <Row className="navbar">
        <Col span={4}>
          <a href="/">
            <img src={LogoNavbar} className="logoNavbar" alt="" />
          </a>
        </Col>
        <Col span={12} className="marginTop">
          <h1>Hulk Store</h1>
        </Col>
        <Col span={8} className="marginTop">
          {!user ? (
            <>
              <Button
                className="btnNavbar"
                shape="round"
                icon={<LoginOutlined />}
                onClick={handleToggleLogin}
              >
                Login
              </Button>
              <Link to="/register">
                <Button
                  className="btnNavbar"
                  shape="round"
                  icon={<UserAddOutlined />}
                >
                  Registro
                </Button>
              </Link>
            </>
          ) : (
            <>
              <Button
                className="btnNavbar"
                shape="round"
                icon={<LoginOutlined />}
                onClick={()=> logout()}
              >
                Cerrar sesión
              </Button>
              <Button
                className="btnNavbar"
                shape="round"
                icon={<ShoppingCartOutlined />}
                onClick={()=>goToCart()}
              >{user?.data?.fullName}</Button>
            </>
          )}
        </Col>
      </Row>
      <LoginModal modalLogin={modalLogin} handleToggleLogin={handleToggleLogin} handleUserLogin={handleUserLogin}/>
    </>
  );
};

export default Navbar;

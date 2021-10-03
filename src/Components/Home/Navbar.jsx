import { Row, Col, Button } from "antd";
import LogoNavbar from "../../img/logo.png";
import {UserAddOutlined, LoginOutlined} from '@ant-design/icons';
import {Link} from 'react-router-dom';

const Navbar = () => {
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
        <Button className="btnNavbar" shape="round" icon={<LoginOutlined />}>
          Login
        </Button>
        <Link to='/register'>
        <Button className="btnNavbar" shape="round" icon={<UserAddOutlined />}>
          Registro
        </Button>
        </Link>
        </Col>
      </Row>
    </>
  );
};

export default Navbar;

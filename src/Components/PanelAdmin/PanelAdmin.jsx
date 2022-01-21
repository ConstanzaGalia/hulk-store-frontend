import { Row, Col, Button, Tabs } from "antd";
import { LoginOutlined, ShopOutlined, UserOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { removeLocalStorage } from "../localStorageHelper/localHelper";
import LogoNavbar from "../../img/logo.png";
import TabProducto from "./TabProducto";
import TabUsers from "./TabUsers";
const { TabPane } = Tabs;

const PanelAdmin = ({ handleUserLogin }) => {
  const history = useHistory();

  const logout = () => {
    removeLocalStorage("token");
    removeLocalStorage("user");
    handleUserLogin(null);
    history.push("/");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Row className="navbar">
        <Col span={4}>
          <a href="/">
            <img src={LogoNavbar} className="logoNavbar" alt="" />
          </a>
        </Col>
        <Col span={12} className="marginTop">
          <h1>Panel Admin Hulk Store</h1>
        </Col>
        <Col span={8} className="marginTop">
          <Button
            className="btnNavbar"
            shape="round"
            icon={<LoginOutlined />}
            onClick={() => logout()}
          >
            Cerrar sesión
          </Button>
        </Col>
      </Row>
      <div className="card-container">
        <Tabs type="card" size="large">
          <TabPane
            tab={
              <span className="title-tab">
                <ShopOutlined />
                Productos
              </span>
            }
            key="1"
            className="tabs-container"
          >
            <TabProducto />
          </TabPane>
          <TabPane
            tab={
              <span className="title-tab">
                <UserOutlined />
                Usuarios
              </span>
            }
            key="2"
            className="tabs-container"
          >
            <TabUsers />
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};

export default PanelAdmin;

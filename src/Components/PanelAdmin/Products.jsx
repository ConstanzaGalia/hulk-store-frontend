import { Row, Col, Button } from "antd";
import { LoginOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { removeLocalStorage } from "../localStorageHelper/localHelper";
import LogoNavbar from "../../img/logo.png";
import FormProduct from './FormProduct';

const Products = ({ handleUserLogin}) => {
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
      <Row className="rowTable">
        <Col span={12}>
          <h2 className="titleProducts">Agregar Producto</h2>
        </Col>
        <Col span={12}>
          <Button
            className="btnNavbar btnAddProduct"
            shape="round"
            icon={<ArrowLeftOutlined />}
            onClick={()=> history.goBack()}
          />
        </Col>
      </Row>
      <FormProduct />
    </>
  );
};

export default Products;

import { Row, Col, Button } from "antd";
import { LoginOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { removeLocalStorage } from "../localStorageHelper/localHelper";
import LogoNavbar from "../../img/logo.png";
import TableProducts from "./TableProducts";
import { useState, useEffect } from "react";
import clientAxios from "../../config/clientAxios";
import { errorMessage } from "../messageHelper/messageHelper";

const PanelAdmin = ({ handleUserLogin }) => {
  const [dataProducts, setDataProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await clientAxios.get("/products");
        const products = res.data;
        setDataProducts(products);
      } catch (error) {
        errorMessage("Los datos no están disponibles en este momento");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  
  const logout = () => {
    removeLocalStorage("token");
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
          <h2 className="titleProducts">Productos</h2>
        </Col>
        <Col span={12}>
          <Button
            className="btnNavbar btnAddProduct"
            shape="round"
            icon={<PlusCircleOutlined />}
          >
            Agregar Producto
          </Button>
        </Col>
      </Row>
      <Row className="rowTable">
        <Col span={22} offset={1}>
          <TableProducts isLoading={isLoading} dataProducts={dataProducts} />
        </Col>
      </Row>
    </>
  );
};

export default PanelAdmin;

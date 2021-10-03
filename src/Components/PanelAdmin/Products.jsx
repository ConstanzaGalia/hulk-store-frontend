import { Row, Col, Button } from "antd";
import { LoginOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { useHistory, useParams } from "react-router-dom";
import { removeLocalStorage } from "../localStorageHelper/localHelper";
import LogoNavbar from "../../img/logo.png";
import FormProduct from './FormProduct';
import {useEffect, useState} from 'react';
import clientAxios from "../../config/clientAxios";
import { errorMessage } from "../messageHelper/messageHelper";
import LoadingComponent from '../Loader/LoadingComponent';

const Products = ({ handleUserLogin}) => {
  const [editProduct, setEditProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const {id} = useParams();

  const logout = () => {
    removeLocalStorage("token");
    removeLocalStorage("user");
    handleUserLogin(null);
    history.push("/");
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (id) {
      const getProduct = async () => {
        try {
          setIsLoading(true);
          const res = await clientAxios.get(`/products/${id}`);
          const product = res.data;
          setEditProduct(product);
          setIsLoading(false);
        } catch (error) {
          errorMessage('Los datos del producto no están disponibles');
        }finally{
          setIsLoading(false);
        }
      }
      getProduct();
    }
  }, [id]);

  return (
    <LoadingComponent isLoading={isLoading}>
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
          <h2 className="titleProducts">{id ? 'Editar Producto' : 'Agregar Producto'}</h2>
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
      <FormProduct editProduct={editProduct} id={id}/>
    </LoadingComponent>
  );
};

export default Products;

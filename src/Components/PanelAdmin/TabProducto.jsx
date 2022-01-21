import { Row, Col, Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import TableProducts from "./TableProducts";
import { useState, useEffect } from "react";
import clientAxios from "../../config/clientAxios";
import { errorMessage } from "../messageHelper/messageHelper";

const TabProducto = () => {
  const [dataProducts, setDataProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await clientAxios.get("/products");
        const products = res.data;
        const activeProducts = products.filter(product => !product.hasOwnProperty('deletedAt'));
        setDataProducts(activeProducts);
      } catch (error) {
        errorMessage("Los datos no están disponibles en este momento");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);
  const addProduct = () => {
    history.push(`/panelAdmin/nuevoProducto`);
  }
  return (
    <>
      <Row className="rowTable">
        <Col span={12}>
          <h2 className="titleProducts">Productos</h2>
        </Col>
        <Col span={12}>
          <Button
            className="btnNavbar btnAddProduct"
            shape="round"
            icon={<PlusCircleOutlined />}
            onClick={addProduct}
          >
            Agregar Producto
          </Button>
        </Col>
      </Row>
      <Row className="rowTable">
        <Col span={22} offset={1}>
          <TableProducts
            isLoading={isLoading}
            dataProducts={dataProducts}
            setDataProducts={setDataProducts}
          />
        </Col>
      </Row>
    </>
  );
};

export default TabProducto;

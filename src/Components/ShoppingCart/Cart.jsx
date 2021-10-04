import { Table, Button, Row, Col, Select, Form, Input } from "antd";
import clientAxios from "../../config/clientAxios";
import { errorMessage, successMessage } from "../messageHelper/messageHelper";
import { useHistory } from "react-router-dom";
import Navbar from "../Home/Navbar";
import { useEffect, useState } from "react";
const { Option } = Select;

const Cart = ({ user, handleUserLogin }) => {
  const [dataCart, setDataCart] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
  const columns = [
    {
      title: "Nombre",
      key: "products",
      render: (key) => {
        return <p>{key.products.name}</p>;
      },
    },
    {
      title: "Precio",
      key: "products",
      render: (key) => {
        return <p>{key.products.price}</p>;
      },
    },
    {
      title: "Cantidad",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  useEffect(() => {
    const fetchCart = async () => {
      try {
        setIsLoading(true);
        const res = await clientAxios.get("/cart");
        const cart = res.data;
        setDataCart(cart);
        setIsLoading(false);
      } catch (error) {
        errorMessage("Carrito no disponible");
      }
      finally{
        setIsLoading(false);
      }
    };
    fetchCart();
  }, []);

  let amount = 0;
  const totalCart = () => {
    dataCart.forEach((product) => {
      const subTotal = product.products.price * product.quantity;
      amount += subTotal;
    });
  };
  totalCart();

  const sale = async (values) => {
    try {
      setIsLoading(true);
      await clientAxios.post('/sale', values);
      successMessage('Su compra se realizó correctamente');
      setIsLoading(false);
      history.push('/');
    } catch (error) {
      errorMessage('Hubo un problema al realizar la compra');
    }finally {
      setIsLoading(false);
    }
  }
  return (
    <>
      <Navbar user={user} handleUserLogin={handleUserLogin} />
      <Row className="rowTable">
        <Col span={12} offset={6}>
          <h3>Productos</h3>
          <Table
            dataSource={dataCart}
            columns={columns}
            loading={isLoading}
            pagination={false}
          />
          <p className="rowTable totalCompra">Total compra: ${amount}</p>
        </Col>
      </Row>
      <Row className="rowTable">
        <Col span={12} offset={6}>
          <h3>Pago</h3>
          <Form
            layout="vertical"
            onFinish={sale}
          >
            <Form.Item
              label="Método de pago"
              name="paymentMethod"
              rules={[{ required: true, message: "Campo obligatorio" }]}
              tooltip="Campo obligatorio"
            >
              <Select defaultValue="Credit Cart" style={{ width: 300 }}>
                <Option value="Credit Cart">Tarjeta Crédito</Option>
                <Option value="Debit Cart">Tarjeta Débito</Option>
                <Option value="Transferencia">Transferencia Bancaria</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Dirección"
              name="address"
              rules={[{ required: true, message: "Campo obligatorio" }]}
              tooltip="Campo obligatorio"
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                className="btnColor"
                block
                htmlType="submit"
              >
                Comprar
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Cart;

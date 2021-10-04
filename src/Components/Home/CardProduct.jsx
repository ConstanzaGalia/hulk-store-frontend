import { Card, Row, Col, Button } from "antd";
import {getLocalStorage} from '../localStorageHelper/localHelper';
import {warningMessage, successMessage, errorMessage} from '../messageHelper/messageHelper';
import clientAxios from '../../config/clientAxios';
const { Meta } = Card;

const CardProduct = ({ product }) => {
  const addToCart = async (id) => {
    try {
      const userLoggedIn = getLocalStorage('token');
      if (!userLoggedIn){
        return warningMessage('Inicie sesión para comprar productos', 3);
      }
      const res = await clientAxios.post('/cart', {productId: id, quantity: 1});
      successMessage(res.data);
    } catch(error) {
      errorMessage('No se pudo agregar al carrito', error.message)
    }
  };
  return (
    <Card
      hoverable
      style={{ width: 240, marginTop: 20 }}
      cover={<img alt="example" src={product.image} className="imgCard" />}
    >
      <Meta title={product.name} description={product.description} />
      <Row className="rowTable">
        <Col span={12}>
          <p className="pPrice">
            Precio: $<span>{product.price}</span>
          </p>
        </Col>
        <Col span={12}>
          <Button
            className="btnNavbar"
            shape="round"
            onClick={() => addToCart(product._id)}
          >
            Comprar
          </Button>
        </Col>
      </Row>
    </Card>
  );
};

export default CardProduct;

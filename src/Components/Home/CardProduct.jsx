import { Card, Row, Col, Button } from "antd";
const { Meta } = Card;

const CardProduct = ({product}) => {
  return (
    <Card
      hoverable
      style={{ width: 240, marginTop: 20 }}
      cover={
        <img
          alt="example"
          src={product.image}
          className="imgCard"
        />
      }
    >
      <Meta title={product.name} description={product.description} />
      <Row className="rowTable">
        <Col span={12}>
          <p className="pPrice">Precio: $<span>{product.price}</span></p>
        </Col>
        <Col span={12}>
          <Button className="btnNavbar" shape="round">Comprar</Button>
        </Col>
      </Row>
    </Card>
  );
};

export default CardProduct;

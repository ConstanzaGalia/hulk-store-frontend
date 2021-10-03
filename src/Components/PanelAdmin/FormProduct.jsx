import { Form, Input, Button, Row, Col, InputNumber } from "antd";
import clientAxios from "../../config/clientAxios";
import LoadingComponent from '../Loader/LoadingComponent';
import { useHistory } from "react-router-dom";
import { errorMessage, successMessage } from "../messageHelper/messageHelper";
import {useState} from 'react';

const FormProduct = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const addProduct = async (values) => {
    try {
      setIsLoading(true);
      await clientAxios.post('/products', values);
      successMessage('Producto agregado exitosamente');
      history.goBack();
      window.scrollTo(0, 0);
    } catch (error) {
      errorMessage('No se pudo agregar el producto');
    }
  }
  return (
    <LoadingComponent isLoading={isLoading}>
    <Row className="rowTable">
      <Col span={16} offset={4}>
      <Form form={form} layout="vertical" onFinish={addProduct}>
        <Form.Item label="Nombre" name="name" required tooltip="Campo obligatorio">
          <Input />
        </Form.Item>
        <Form.Item label="Url imágen" name="image" required tooltip="Campo obligatorio">
          <Input />
        </Form.Item>
        <Form.Item label="Precio" name="price" required tooltip="Campo obligatorio">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Stock" name="stock" required tooltip="Campo obligatorio">
          <InputNumber />
        </Form.Item>
        <Form.Item label="Descripción" name="description">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" className="btnColor" block htmlType="submit">Agregar</Button>
        </Form.Item>
      </Form>
      </Col>
    </Row>
    </LoadingComponent>
  );
};

export default FormProduct;

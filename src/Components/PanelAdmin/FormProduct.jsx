import { Form, Input, Button, Row, Col, InputNumber } from "antd";
import clientAxios from "../../config/clientAxios";
import LoadingComponent from "../Loader/LoadingComponent";
import { useHistory } from "react-router-dom";
import { errorMessage, successMessage } from "../messageHelper/messageHelper";
import { useState } from "react";

const FormProduct = ({ editProduct, id }) => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const addProduct = async (values) => {
    try {
      setIsLoading(true);
      await clientAxios.post("/products", values);
      successMessage("Producto agregado exitosamente");
      history.goBack();
      window.scrollTo(0, 0);
    } catch (error) {
      errorMessage("No se pudo agregar el producto");
    }
  };

  const updateProduct = async (values) => {
    try {
      setIsLoading(true);
      await clientAxios.put(`/products/${id}`, values);
      successMessage("Producto editado exitosamente");
      history.goBack();
      window.scrollTo(0, 0);
    } catch (error) {
      console.log(error);
      errorMessage("No se pudo editar el producto");
    }
  }

  return (
    <LoadingComponent isLoading={isLoading}>
      <Row className="rowTable">
        <Col span={16} offset={4}>
          <Form
            form={form}
            layout="vertical"
            onFinish={id ? updateProduct : addProduct}
            initialValues={id ? editProduct : null}
          >
            <Form.Item
              label="Nombre"
              name="name"
              rules={[{ required: true, message: "Campo obligatorio" }]}
              tooltip="Campo obligatorio"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Url imágen"
              name="image"
              rules={[{ required: true, message: "Campo obligatorio" }]}
              tooltip="Campo obligatorio"
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Precio"
              name="price"
              rules={[{ required: true, message: "Campo obligatorio" }]}
              tooltip="Campo obligatorio"
            >
              <InputNumber />
            </Form.Item>
            <Form.Item
              label="Stock"
              name="stock"
              rules={[{ required: true, message: "Campo obligatorio" }]}
              tooltip="Campo obligatorio"
            >
              <InputNumber />
            </Form.Item>
            <Form.Item label="Descripción" name="description">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                className="btnColor"
                block
                htmlType="submit"
              >
                {id ? "Editar" : "Agregar"}
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </LoadingComponent>
  );
};

export default FormProduct;

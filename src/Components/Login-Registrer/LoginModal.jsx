import { Modal, Form, Button, Input } from "antd";
import { useHistory } from "react-router-dom";
import clientAxios from "../../config/clientAxios";
import { errorMessage, successMessage } from "../messageHelper/messageHelper";
import { useState } from "react";
import { setLocalStorage } from "../localStorageHelper/localHelper";
import { LoadingOutlined } from "@ant-design/icons";

const LoginModal = ({ modalLogin, handleToggleLogin, handleUserLogin }) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const login = async (values) => {
    try {
      setLoading(true);
      const res = await clientAxios.post("/login", values);
      const user = res.data;
      handleUserLogin(user);
      setLocalStorage("token", user.JWT);
      setLoading(false);
      handleToggleLogin();
      history.push("/");
      successMessage("Bienvenido a Hulk Store");
    } catch (error) {
      errorMessage("Hubo un problema al iniciar sesión, intente nuevamente", 3);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Ingresá a tu cuenta Hulk Store"
      visible={modalLogin}
      onCancel={handleToggleLogin}
      footer={null}
    >
      {loading ? (
        <LoadingOutlined style={{ fontSize: 24 }} spin />
      ) : (
        <Form
          name="basic"
          labelCol={{ span: 5 }}
          onFinish={login}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
};

export default LoginModal;

import { Row, Form, Input, Button } from 'antd';
import {useHistory} from 'react-router-dom';
import clientAxios from '../../config/clientAxios';
import {errorMessage, successMessage} from '../messageHelper/messageHelper';
import LoadingComponent from '../Loader/LoadingComponent';
import { useState } from 'react';
import { setLocalStorage } from '../localStorageHelper/localHelper';

const Register = ({handleUserLogin}) => {
  const history = useHistory();
  const [loading, setLoading] = useState(false);

  const register = async (values) => {
    try {
      setLoading(true);
      const res = await clientAxios.post('/register', values);
      const user = res.data;
      handleUserLogin(user);
      setLocalStorage('token', user.JWT);
      setLocalStorage('user', user.data);
      history.push('/');
      successMessage('Usuario registrado exitosamente');
    } catch (error) {
      errorMessage('Hubo un problema con el registro, intente nuevamente', 3);
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className="divRegister">
      <Row>
        <h3 className="titleRegister">Registrate en Hulk Store</h3>
      </Row>
      <LoadingComponent isLoading={loading}>
      <Row>
        <Form
          name="basic"
          labelCol={{ span: 10 }}
          id="formRegister"
          onFinish={register}
          autoComplete="off"
        >
          <Form.Item
            label="Nombre y Apellido"
            name="fullName"
            rules={[{ required: true, message: 'Campo obligatorio' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Campo obligatorio' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Campo obligatorio' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Campo obligatorio' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
            <Button type="primary" htmlType="submit" className="btn-register">
              Registrarme
            </Button>
          </Form.Item>
        </Form>
      </Row>
      </LoadingComponent>
    </div>
  )
}

export default Register
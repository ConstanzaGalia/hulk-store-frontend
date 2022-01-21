import { Row, Col } from "antd";
import TableUsers from "./TableUsers";
import { useState, useEffect } from "react";
import clientAxios from "../../config/clientAxios";
import { errorMessage } from "../messageHelper/messageHelper";

const TabUsers = () => {
  const [dataUsers, setDataUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const res = await clientAxios.get("/users");
      const users = res.data;
      const activeUsers = users.filter(user => !user.hasOwnProperty('deletedAt'));
      setDataUsers(activeUsers);
    } catch (error) {
      errorMessage("Los datos no están disponibles en este momento");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <Row className="rowTable">
        <Col span={12}>
          <h2 className="titleProducts">Usuarios</h2>
        </Col>
      </Row>
      <Row className="rowTable">
        <Col span={22} offset={1}>
          <TableUsers
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            dataUsers={dataUsers}
            setDataUsers={setDataUsers}
            fetchUsers={fetchUsers}
          />
        </Col>
      </Row>
    </>
  );
};

export default TabUsers;

import { Table, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import clientAxios from "../../config/clientAxios";
import { errorMessage } from "../messageHelper/messageHelper";

const TableUsers = ({ isLoading, setIsLoading, dataUsers, setDataUsers, fetchUsers }) => {
  const columns = [
    {
      title: "Nombre y Apellido",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Acciones",
      dataIndex: "_id",
      key: "_id",
      render: (key, data) => {
        return (
          <>
            {data.role === "admin" ? (
              ""
            ) : (
              <Popconfirm
                title="¿Seguro desea actualizar el usuario a rol admin?, esta acción no tiene retorno"
                onConfirm={() => editUserRole(key)}
                okText="Si"
                cancelText="No"
              >
                <Button
                  style={{ border: "none", marginRight: "10px" }}
                  size="small"
                  icon={<EditOutlined />}
                >
                  {" "}
                  Hacer admin{" "}
                </Button>
              </Popconfirm>
            )}
            <Popconfirm
              title="¿Seguro desea eliminar el usuario?"
              onConfirm={() => deleteUser(key)}
              okText="Si"
              cancelText="No"
            >
              <Button
                style={{ border: "none" }}
                size="small"
                icon={<DeleteOutlined />}
              />
            </Popconfirm>
          </>
        );
      },
    },
  ];

  const deleteUser = async (id) => {
    try {
      setIsLoading(true);
      const res = await clientAxios.delete(`/users/${id}`);
      const userDeleted = res.data._id;
      const filteredUsers = dataUsers.filter(
        (user) => user._id !== userDeleted
      );
      setDataUsers(filteredUsers);
      setIsLoading(false);
    } catch (error) {
      errorMessage("No se pudo eliminar el usuario", 3);
    }
  };

  const editUserRole = async (id) => {
    const updateToAdmin = {
      role: "admin"
    }
    try {
      setIsLoading(true)
      await clientAxios.put(`/users/${id}`, updateToAdmin);
      fetchUsers();
      setIsLoading(false);
    } catch (error) {
      errorMessage("No se pudo actualizar el usuario", 3);
    }
  };
  return (
    <Table
      dataSource={dataUsers}
      columns={columns}
      loading={isLoading}
      pagination={{ position: ["bottomCenter"], defaultPageSize: 10 }}
    />
  );
};

export default TableUsers;

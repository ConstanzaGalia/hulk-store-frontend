import { Table, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TableProducts = ({ isLoading, dataProducts }) => {
  const columns = [
    {
      title: "Imágen",
      dataIndex: "image",
      key: "image",
      render: (key) => {
        return <img src={key} alt="" className="imgTable" />;
      },
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descripción",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Precio",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Acciones",
      dataIndex: "_id",
      key: "_id",
      render: (key) => {
        return (
          <>
            <Button
              style={{ border: "none" }}
              size="small"
              // onClick={() => handleEditUser(key)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="¿Seguro desea eliminar el producto?"
              // onConfirm={() => deleteUser(key)}
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
  return (
    <Table
      dataSource={dataProducts}
      columns={columns}
      loading={isLoading}
      pagination={{ position: ["bottomCenter"], defaultPageSize: 10 }}
    />
  );
};

export default TableProducts;

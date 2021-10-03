import { Table, Button, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import clientAxios from "../../config/clientAxios";
import { errorMessage } from "../messageHelper/messageHelper";
import { useHistory, useRouteMatch} from "react-router-dom";

const TableProducts = ({ isLoading, dataProducts, setDataProducts }) => {
  const history = useHistory();
  const {path} = useRouteMatch();
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
              onClick={() => editProduct(key)}
              icon={<EditOutlined />}
            />
            <Popconfirm
              title="¿Seguro desea eliminar el producto?"
              onConfirm={() => deleteProduct(key)}
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

  const deleteProduct = async (id) => {
    try {
      const res = await clientAxios.delete(`/products/${id}`);
      const productDeleted = res.data._id;
      const filteredProducts = dataProducts.filter(
        (product) => product._id !== productDeleted
      );
      setDataProducts(filteredProducts);
    } catch (error) {
      errorMessage("No se pudo eliminar el producto", 3);
    }
  };

  const editProduct = (id) => {
    history.push(`${path}/editarProducto/${id}`);
    window.scrollTo(0, 0);
  }
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

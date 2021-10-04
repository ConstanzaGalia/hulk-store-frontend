import { Row } from 'antd';
import CardProduct from './CardProduct';
import LoadingComponent from '../Loader/LoadingComponent';
import {useState, useEffect} from 'react';
import clientAxios from '../../config/clientAxios';
import { errorMessage } from '../messageHelper/messageHelper';

const SectionProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [dataProducts, setDataProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const res = await clientAxios.get("/products");
        const products = res.data;
        const activeProducts = products.filter(product => !product.hasOwnProperty('deletedAt'));
        setDataProducts(activeProducts);
      } catch (error) {
        errorMessage("Los productos no están disponibles en este momento");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <LoadingComponent isLoading={isLoading}>
    <div className="divProducts">
    <h2 className="titleProducts">Productos</h2>
    <Row className="rowTable" justify='space-around'>
      {
        dataProducts.map((product) => (
          <CardProduct product={product} key={product._id}/>
        ))
      }
    </Row>
    </div>
    </LoadingComponent>
  )
}

export default SectionProducts;
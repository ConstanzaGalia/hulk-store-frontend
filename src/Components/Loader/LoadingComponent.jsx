import { LoadingOutlined } from '@ant-design/icons';

const LoadingComponent = ({ isLoading, children }) => {
  if (isLoading) {
    return <LoadingOutlined style={{ fontSize: 24 }} spin />;
  }
  return children;
};

export default LoadingComponent;

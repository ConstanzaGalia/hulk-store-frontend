import {Row, Col} from 'antd';

const Footer = () => {
  return(
    <Row className='footer'>
      <Col span={12} offset={6}>
        <h4 className='h4Footer'>&copy; todos los derechos reservados a Hulk Store</h4>
      </Col>
    </Row>
  )
}

export default Footer;
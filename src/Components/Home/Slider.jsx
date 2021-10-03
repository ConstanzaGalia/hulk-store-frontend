import { Carousel } from 'antd';

const Slider = () => {
  return(
    <Carousel className="slider" autoplay={true}
    effect="fade">
    <div className="slider">
      <img src="https://i0.wp.com/hipertextual.com/wp-content/uploads/2019/07/hipertextual-marvel-revela-sera-final-universo-marvel-2019314666.jpg?fit=1200%2C782&ssl=1" alt=""className="slider-img"/>
    </div>
    <div className="slider">
      <img src="https://phantom-marca.unidadeditorial.es/838d5234c7803b705c60abc334975919/resize/1320/f/jpg/assets/multimedia/imagenes/2021/07/06/16255683165037.jpg" alt="" className="slider-img"/>
    </div>
    <div className="slider">
      <img src="https://www.stationattraction.com/wp-content/uploads/2017/01/Retail-Expansion-4.jpg" alt="" className="slider-img"/>
    </div>
  </Carousel>
  )
}

export default Slider;
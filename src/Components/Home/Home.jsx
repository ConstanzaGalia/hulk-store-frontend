import Navbar from './Navbar';
import Slider from './Slider';
import SectionProducts from './SectionProducts';

const Home = ({user, handleUserLogin}) => {
  return (
    <>
      <Navbar user={user} handleUserLogin={handleUserLogin}/>
      <Slider />
      <SectionProducts />
    </>
  )
}

export default Home;
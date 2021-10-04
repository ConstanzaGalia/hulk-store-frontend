import Navbar from './Navbar';
import Slider from './Slider';
import SectionProducts from './SectionProducts';
import Footer from './Footer';

const Home = ({user, handleUserLogin}) => {
  return (
    <>
      <Navbar user={user} handleUserLogin={handleUserLogin}/>
      <Slider />
      <SectionProducts />
      <Footer />
    </>
  )
}

export default Home;
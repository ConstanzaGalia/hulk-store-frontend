import Navbar from './Navbar';
import Slider from './Slider';

const Home = ({user, handleUserLogin}) => {
  return (
    <>
      <Navbar user={user} handleUserLogin={handleUserLogin}/>
      <Slider />
    </>
  )
}

export default Home;
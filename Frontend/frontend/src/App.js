// import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar';
import Shop from './Pages/Shop';
import Product from './Pages/Product';
import ShopCategory from './Pages/ShopCategory';
import LoginSingnup from './Pages/LoginSingnup';
import Cart from './Pages/Cart';
import Footer from './Component/Footer/Footer';
import banner_mens from './Component/Assets/banner_mens.png';
import women_banner from './Component/Assets/banner_women.png';
import kid_banner from './Component/Assets/banner_kids.png';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element = {<Shop />} />
          <Route path='/mens' element = {<ShopCategory category = 'men' banner = {banner_mens} />} />
          <Route path='/women' element = {<ShopCategory category = 'women' banner = {women_banner} />} />
          <Route path='/kids' element = {<ShopCategory category = 'kid' banner = {kid_banner} />} />
          <Route path='/product' element = {<Product />} >
            <Route path=':productId' element = {<Product />} />
          </Route>
          <Route path='/cart' element = {<Cart />} />
          <Route path='/login' element = {<LoginSingnup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Services from './pages/Services';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import ProfileInfo from './pages/user-routes/ProfileInfo';
import MyCart from './pages/user-routes/MyCart';
import Departments from './pages/Departments';
import ProductDashboard from './pages/ProductDashboard';
import 'remixicon/fonts/remixicon.css'
import MyCartProductDisplay from './components/MyCartProductDisplay';
import ProductCheckout from './pages/ProductCheckout';
import MyCartCheckout from './pages/MyCartCheckout';
import OrderConfirmed from './pages/OrderConfirmed';
import MyOrders from './pages/MyOrders';
import ContactUs from './pages/ContactUs';
import QuerySubmitted from './pages/QuerySubmitted';
import DiscountDeals from './pages/DiscountDeals';
function App() {
  return (
    
   <BrowserRouter>
   <ToastContainer/>
   <Routes>
    
    <Route path="/" element={<Home/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/departments" element={<Departments/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/services" element={<Services/>}/>
    <Route path='/product/:id' element={<ProductDashboard/>}/>
    <Route path='/product/mycart/:id' element={<MyCartProductDisplay/>}/>
    <Route path="/product/buyProduct/:isSingleProductCheckout/:id" element={<ProductCheckout/>}/>
    <Route path='/OrderConfirmed' element={<OrderConfirmed/>}/>
    <Route path='/contactUs' element={<ContactUs/>}/>
    <Route path='/querySubmitted' element={<QuerySubmitted/>}/>
    <Route path='/discountDeals' element={<DiscountDeals/>}/>
    <Route path='/user' element={<PrivateRoute/>}>
      <Route path='profile/:id' element={<ProfileInfo/>}/>
      <Route path='MyCart' element={<MyCart/>}/>
      <Route path="CartCheckout/:isSingleProductCheckout/:id" element={<MyCartCheckout/>}/>
      <Route path="MyOrders/:id" element={<MyOrders/>}/>
    </Route>
    
   </Routes>
   </BrowserRouter>
   
  );
}

export default App;

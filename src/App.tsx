import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './Components/Auth/Login';
import Products from './Components/Products/Products';
// import AddProduct from './Components/Products/AddProduct';
import Admin from './Components/Admin/Admin';
import { Toaster } from 'react-hot-toast';


function App() {
 
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/products' element={<Products/>}/>
        {/* <Route path='/products/addproduct' element={<AddProduct updateValues={updateValue} setUpdateValue={setUpdateValue}/>}/> */}
        <Route path='/admin/dashboard' element={<Admin/>}/>
      </Routes>
      <Toaster/>
    </Router>
  );
}

export default App;

import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import Login from './Components/Auth/Login';
import Products from './Components/Products/Products';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/products' element={<Products/>}/>
      </Routes>
    </Router>
  );
}

export default App;

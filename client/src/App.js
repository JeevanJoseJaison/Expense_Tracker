import './App.css';
// import 'antd/dist/antd.css';
import {BrowserRouter , Navigate, Route , Routes} from "react-router-dom";
import Test from "./pages/Test";
import Home from './pages/Home';
import Login from './pages/Login';
import Register from "./pages/Register";

function App() {
 

  return (
    <div className='App'>       
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
          <Route path='/test' element={<ProtectedRoute><Test/></ProtectedRoute>}/>
          <Route path='/login' element ={<Login/>}/>
          <Route path='register' element={<Register/>}/>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

// if not logged in then redirect the page to login
export const ProtectedRoute =(props) =>{
  if(localStorage.getItem("expense-user"))
  {
    return props.children;
  }
  else{
   return <Navigate to= "/login"/>
  }

}


export default App;

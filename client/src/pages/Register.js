import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import React ,{useState , useEffect} from "react";
import { Link, useNavigate} from "react-router-dom";
import "./Authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import "antd/dist/antd.css";


function Register() {
    const[loading , setLoading] = useState(false);  
    const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
     setLoading(true);
      await axios.post("/api/users/register", values);
      message.success("Registration Successfull");
      navigate("/login");
      setLoading(false);
    } catch (error) {
      message.error("Something went wrong");
     setLoading(false);
    }
  };
  useEffect(()=>{
    if(localStorage.getItem("expense-user"))
    {
        navigate("/")
    }
},[navigate])
 

  return (
    <div className="register">
      {loading&&<Spinner/>}
      <div className="row justify-content-center align-items-center w-100 h-100">
        <div className="col-md-5">
          <div className="lottie">
          <lottie-player src="https://assets7.lottiefiles.com/packages/lf20_xx9zron9.json"  background="transparent"  speed="1"   loop  autoplay></lottie-player>
          </div>
        </div>
        <div className="col-md-4">
          <Form layout="vertical" onFinish={onFinish}>
            <h1>REGISTER</h1>
           
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item className="formitem" label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item className="formitem" label="Password" name="password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-between align-items-center">
            <p className = "link"> Already Registered, <Link  to="/login">
                                Click Here 
                            </Link> To Login</p>
              <button className="primary" type="submit">
                <HowToRegIcon/>
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import {React,useEffect,useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Authentication.css";
import axios from "axios";
// import Spinner from "../components/Spinner";
import LoginIcon from '@mui/icons-material/Login';
import "antd/dist/antd.css";
import Spinner from "../components/Spinner";


function Login() {
    const[loading , setLoading] = useState(false);   

    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            setLoading(true);
           
            const response = await axios.post("/api/users/login", values);
           
            localStorage.setItem(
                "expense-user",
                JSON.stringify({ ...response.data, password: "" })
            );
            setLoading(false);
            message.success("Login successful");
            navigate("/");
        } catch (error) {
            console.log(error);
            setLoading(false);
            message.error("Login failed");
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
                        <lottie-player src="https://assets9.lottiefiles.com/packages/lf20_wlzayt5j.json" background="transparent" speed="1" loop autoplay></lottie-player>
                    </div>
                </div>
                <div className="col-md-4">
                    <Form layout="vertical" onFinish={onFinish}>
                        <h1>Login</h1>


                        <Form.Item label="Email" name="email">
                            <Input />
                        </Form.Item>
                        <Form.Item className="formitem" label="Password" name="password">
                            <Input type="password" />
                        </Form.Item>

                        <div className="d-flex justify-content-between align-items-center">
                            <p className = "link"> Not Registered Yet, <Link  to="/register">
                                Click Here 
                            </Link> To Register</p>
                            
                            <button className="primary" type="submit">
                                <LoginIcon/>
                            </button>
                        </div>
                    </Form>
                </div>
               
            </div>
        </div>
    );
}

export default Login;
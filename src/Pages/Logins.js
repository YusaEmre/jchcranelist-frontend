import React, {  useState } from "react"
import { useNavigate } from "react-router-dom";
import Input from "../component/Input";
import '../App.css';
import { setLocalStorage} from "../service/LoginService";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { URL } from "../service/LoginService";
const Login = (props) => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [isError,setError] = useState()
    const navigate = useNavigate();


    const handleLogin = async (event) =>{
        event.preventDefault()
            const body={
                email,
                password
             }
             try{
                const response = await axios.post(URL+"user/login",body)
                setLocalStorage(response.data)
                navigate('/dashboard')
     
             }
             catch(error){
                console.log(error.response.error)
                setError(error.response.error)
             }
          
    }

   

    const disabled = email && password
    return (
        <div className="container text-center">
            <form>
            <Input name="email" label="Email" onChange={(change)=>{setEmail(change.target.value)}}></Input>
            <Input name="password" label="Password" type="password" onChange={(change)=>{setPassword(change.target.value)}} ></Input>
            <div className="button-rigth-margin">
                <button onClick={handleLogin} type="submit" className="button-background mt-4" disabled={!disabled}>Sign In</button>
            </div>
            </form>
            <p>{isError}</p>zz
        </div>
    )
}

export default Login;

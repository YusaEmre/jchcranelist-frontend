import React, {  useState } from "react"
import Input from "../component/Input";
import '../App.css';
const Login = (props) => {
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const disabled = username && password
    return (
        <div className="container">
            <form>
            <Input name="username" label="Username" onChange={(change)=>{setUsername(change.target.value)}}></Input>
            <Input name="password" label="Password" type="password" onChange={(change)=>{setPassword(change.target.value)}} ></Input>
            <div className="text-center">
                <button type="submit" className="button-background mt-4" disabled={!disabled}>Sign In</button>
            </div>
            </form>
        </div>
    )
}

export default Login;

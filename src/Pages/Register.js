import React, {  useState } from "react"
import Input from "../component/Input";
import '../App.css';

const Register = ()=>{

    const [name,setName] = useState();
    const [surname,setSurname] = useState();
    const [email,setEmail] = useState();
    const [phoneNumber,setPhoneNumber] = useState();
    const [password,setPassword] = useState();


    const disabled = name && surname && email && phoneNumber && password
    return(
        <div className="container text-center">
            <form>
                <Input name="name" label="Name" onChange={(change)=>setName(change.target.value)}></Input>
                <Input name="surname" label="Surname" onChange={(change)=>setSurname(change.target.value)}></Input>
                <Input name="email" label="Email" onChange={(change)=>setEmail(change.target.value)}></Input>
                <Input name="phoneNumber" label="Phone Number" onChange={(change)=>setPhoneNumber(change.target.value)}></Input>
                <Input name="password" type="password" label="Password" onChange={(change)=>setPassword(change.target.value)}></Input>
            </form>
            <div className="button-rigth-margin">
                <button type="submit" className="button-background mt-4" disabled={!disabled}>Sign In</button>
            </div>
        </div>

    )
}
export default Register;

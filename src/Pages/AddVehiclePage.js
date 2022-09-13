import React from "react"
import '../App.css';
import Input from "../component/Input";
import {  useState } from "react"
import axios from "axios";
import { authHeader, URL } from "../service/LoginService";

const AddVehiclePage = () => {
    const [vehicleModel,setVehicleModel] = useState();
    const [fleetNo,setFleetNo] = useState();
    const [operator,setOperator] = useState();
    const [size,setSize] = useState();
    const [date,setDate] = useState();
    const [message,setMessage] = useState()

    const disabled = vehicleModel && fleetNo && operator && size && date

    const onClick = async (event)=>{
        setMessage(undefined)
        event.preventDefault()

        const data={
            vehicleModel,
            fleetNo,
            operator,
            size,
            date
        }
        try{
            const response = await axios.post(URL+"vehicle/save",data,{headers:authHeader()});
            setMessage("Add Successfully vehicle")
        }
        catch(er){
            console.log(er.response.error)
            setMessage("Unauthorized")
        }
    }
    return (
        <div className="container">
            <h4 className="text-center">Add Vehicle</h4>
            <p className="text-center">{message}</p>

      <div className='vehicle-page'>
         <form>
                <Input name="vehicleModel" label="Vehicle Model" onChange={(change)=>setVehicleModel(change.target.value)}></Input>
                <Input name="fleetNo" label="Fleet No" onChange={(change)=>setFleetNo(change.target.value)}></Input>
                <Input name="operator" label="Operator" onChange={(change)=>setOperator(change.target.value)}></Input>
                <Input name="size" minnum="0" label="Size" type="number" onChange={(change)=>setSize(change.target.value)}></Input>
                <Input name="date" type="Date" label="Date" onChange={(change)=>setDate(change.target.value)}></Input>
            </form>
            <div className="button-rigth-margin">
                <button type="submit" onClick={onClick} className="button-background mt-4" disabled={!disabled}>Sign In</button>
            </div>

        </div>
        </div>
    )
}

export default AddVehiclePage;
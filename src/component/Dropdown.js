import React, {useState} from 'react';
import { CustomGrid } from './Grid';

const DropDown = ({month,setMonth}) => {
  // Array of objects containing our month data
  let months = [
    {  value: "January" },
    {  value: "February" },
    {  value: "March" },
    {  value: "April" },
    {  value: "May" },
    { value: "June" },
    {  value: "July" },
    {  value: "August" },
    {  value: "September" },
    {  value: "October" },
    {  value: "November" },
    {  value: "December" }
]



// Using this function to update the state of month
// whenever a new option is selected from the dropdown
let handleMonthChange = (e) => {
    setMonth(e.target.value)
}

  return (
    <div style={{display: 'flex', justifyContent:'flex-end', marginBottom:30}}>
    
    <br />
    
    <select value={month}  onChange={handleMonthChange}>
            {/* Mapping through each month object in our months array
          and returning an option element with the appropriate attributes / values.
         */}
      {months.map((month) => <option key={month.value} value={month.value}>{month.value}</option>)}
    </select>
    </div>
  );
}

export default DropDown;

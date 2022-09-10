export default function Input(props) {
    const{name,onChange,label,type,error}=props
    const isError=error ? "form-control is-invalid" : "form-control"
  return (
    <div className="form-group mt-4">
    <input className={isError} placeholder={label} name={name} onChange={onChange} type={type}></input>
    {isError &&
      <div className="invalid-feedback">
        {error}
    </div>
    }
    </div>
  
  )
}
export default function Input(props) {
    const{name,onChange,label,type,error,minnum}=props
    const isError=error ? "form-control is-invalid" : "form-control"
  return (
    <div className="form-group row mt-3">
    <input min={minnum} className="form-control w-5" placeholder={label} name={name} onChange={onChange} type={type}></input>
    {isError &&
      <div className="invalid-feedback">
        {error}
    </div>
    }
    </div>
  
  )
}
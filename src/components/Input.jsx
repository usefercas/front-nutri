import clsx from "clsx";

const Input = ({ value, onChange, name, placeholder, type, label, error, onBlur }) => {
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">{label}</label>
      <input
        type={type} 
        name={name} 
        id={name} 
        value={value} 
        onChange={onChange} 
        onBlur={onBlur} 
        placeholder={placeholder} 
        className={clsx(
          "form-control", 
          { "is-invalid": error }
        )}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  )
}

export default Input;

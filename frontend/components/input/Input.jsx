import './input.css'
function Input({ type, placeholder, name, value, onChange,max }) {

    return (
        <input
            max={max}
            type={type}
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
        />
    )
}

export default Input
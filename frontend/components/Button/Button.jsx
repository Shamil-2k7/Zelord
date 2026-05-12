import './button.css'

export default function Button({text,onclick,type}) {
    
return(
    <button type={type} onClick={onclick}>{text}</button>
)
}
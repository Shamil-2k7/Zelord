import Button from "../Button/Button";
import Dropdown from "../Dropdown/Dropdown";
import Input from "../Input/Input";
import Labal from "../Labal/labal";
import './form.css'

function Form({ data, onSubmit, values, handleChange, btnText, btnType,otherlink }) {
    return (
        <div className="FormWrapper">
            <form onSubmit={onSubmit}>

                {data.map((item, index) => (
                    <div key={index}>
                        <Labal text={item.name} />

                        {item.type === "dropdown" ? (
                            <select
                                name={item.name}
                                value={values[item.name]}
                                onChange={handleChange}
                            >
                                <option value="">Select</option>
                                {item.values.map((val, i) => (
                                    <option key={i} value={val}>{val}</option>
                                ))}
                            </select>
                        ) :

                        item.type === "file" ? (
                            <input
                                type="file"
                                name={item.name}
                                onChange={(e) =>
                                    handleChange({
                                        target: {
                                            name: item.name,
                                            value: e.currentTarget.files[0]
                                        }
                                    })
                                }
                            />
                        ) : (
                            <input
                                type={item.type}
                                name={item.name}
                                value={values[item.name]}
                                onChange={handleChange}
                                max={item.max}
                            />
                        )}
                    </div>
                ))}
                   <a href={otherlink.link}>{otherlink.text}</a> 
                <Button text={btnText} type={btnType} />
            </form>
        </div>
    )
}

export default Form
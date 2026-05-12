function Dropdown({ name, values, selected, onchange }) {
    return (
        <select name={name} value={selected} onChange={onchange}>
            <option value="">Select Category</option>

            {values.map((item, index) => (
                <option key={index} value={item}>
                    {item}
                </option>
            ))}
        </select>
    )
}

export default Dropdown
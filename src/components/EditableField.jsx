import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

const EditableField = ({cellData, onItemizedItemEdit}) => {
const [value, setValue] = React.useState(cellData.value);
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    onItemizedItemEdit(cellData.name,newValue,cellData.id);
  }

  return (
    <InputGroup className="my-1">
      {cellData.leading != null && (
        <InputGroup.Text>
          <span>{cellData.leading}</span>
        </InputGroup.Text>
      )}
      <Form.Control
        className={cellData.textAlign}
        type={cellData.type}
        value={value}
        onChange={handleChange}
        placeholder={cellData.placeholder}
        style={{maxWidth: cellData.width}}
        required
        id={cellData.id}
        name={cellData.name}
        min={cellData.min}
        precision={cellData.precision}
        step={cellData.step}
        disabled={cellData.disabled}
        readOnly={cellData.readOnly}
        aria-label={cellData.ariaLabel}
      />
    </InputGroup>
  ) 
}

export default EditableField

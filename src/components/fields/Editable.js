import React from 'react';
import PropTypes from 'prop-types';

// this gives either editable text field or just value field
export const Editable = ({editField, field, rowId, value, onChange, setEdit}) => {
  const type = (field === 'email'?'email':'text');
  if(editField.id === rowId && editField.field===field){
    return (
      <div key={field}>
      {field === 'phone' ? (
          <input type={type} name={field} value={value} placeholder="Muodossa 123 123 123"
            onChange={(e) => onChange(rowId, field, e)} onBlur={() => setEdit("", "")} required />
      ) : (
        <input type={type} name={field} value={value} onChange={(e) => onChange(rowId, field, e)} onBlur={() => setEdit("", "")} required />
      )}
      </div>
    )
  }
  return (
    <div key={field} role="button" onClick={() => setEdit(rowId, field)} onKeyPress={() => setEdit(rowId, field)} tabIndex={0}>{value}</div>
  )
}

Editable.propTypes = {
  editField: PropTypes.instanceOf(Object).isRequired,
  field: PropTypes.string.isRequired,
  rowId: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  setEdit: PropTypes.func.isRequired
}

export default Editable;
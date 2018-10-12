import React from "react";

// this gives either editable text field or just value field
export const Editable = ({editField, field, rowId, value, onChange, setEdit}) => {
  const type = (field === 'email'?'email':'text');
  const md = 'col-md-' + (field === 'email'?4:3);
  if(editField.id === rowId && editField.field===field){
    return (
      <div className={md} key={field}>
      {field === 'phone' ? (
          <input type={type} name={field} value={value} pattern="[0-9 ]{8,12}" placeholder="Muodossa 123 123 123"
            onChange={(e) => onChange(rowId, field, e)} onBlur={() => setEdit("", "")} required />
      ) : (
        <input type={type} name={field} value={value} onChange={(e) => onChange(rowId, field, e)} onBlur={() => setEdit("", "")} required />
      )}
      </div>
    )
  } else {
    return (
      <div className={md} key={field} onClick={() => setEdit(rowId, field)}>{value}</div>
    )
  }
}
import React from "react";  

// this will sort values based on sortBy state
export const sortValues = (values, sortBy) => {
  // using typeof to decide how to sort, could do more types but keep it simple
  if (typeof values[0][sortBy.field] === 'number') {
    return values.sort((a,b) => {
      return sortBy.dir==="desc"?
        a[sortBy.field] - b[sortBy.field]:
        -( a[sortBy.field] - b[sortBy.field] )
    })
  } else {
    //with text fields using localeCompare (finnish)
    return values.sort((a,b) => {
      return sortBy.dir==="desc"?
        a[sortBy.field].localeCompare(b[sortBy.field], 'fi'):
        -( a[sortBy.field].localeCompare(b[sortBy.field], 'fi') )
    })
  }
}
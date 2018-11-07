// this will sort values based on sortBy state
export const SortValues = (values, sortBy) => {
  // using typeof to decide how to sort, could do more types but right now only what I need

  // Number fields
  if (typeof values[0][sortBy.field] === 'number') {
    return values.sort((a,b) => (sortBy.dir==="desc"?
        a[sortBy.field] - b[sortBy.field]:
        -( a[sortBy.field] - b[sortBy.field] )
    ))
  }

  // Date fields
  if (typeof values[0][sortBy.field] === 'object' && 
    Object.prototype.toString.call(values[0][sortBy.field]) === '[object Date]') {
    return values.sort((a,b) => (sortBy.dir==="desc" ? 
      new Date(a[sortBy.field]) - new Date(b[sortBy.field]) :
      -(new Date(a[sortBy.field]) - new Date(b[sortBy.field]))) )
  }

  // rest with text fields using localeCompare (finnish)
  return values.sort((a,b) => (sortBy.dir==="desc"?
      a[sortBy.field].localeCompare(b[sortBy.field], 'fi'):
      -( a[sortBy.field].localeCompare(b[sortBy.field], 'fi') )
  ))
}

export default SortValues;
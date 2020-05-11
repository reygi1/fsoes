import React from 'react'
import { connect} from 'react-redux'
import { filterValue } from '../reducers/filterReducer'

const Filter = (props) => {
  
  const handleChange = (event) => {
    const input = event.target.value
    props.filterValue(input)

  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}



const mapDispatchToProps = {
  filterValue
  }
  
  const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes
    }
  }
  
const conFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
  
  
export default conFilter

import { useDispatch } from "react-redux"
import {setfilter} from "../reducers/filterReducer"
const Filter = () => {
  const dispatch  = useDispatch()
  const handleChange = (event) => {
    dispatch(setfilter(event.target.value))
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input type="text" onChange={handleChange} />
    </div>
  )
}

export default Filter
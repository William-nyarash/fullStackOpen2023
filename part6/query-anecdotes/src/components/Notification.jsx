import { useNotification } from "./NotificationContext"

const Notification = () => {
  const { state, dispatch } = useNotification()

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    color: "black",
  }
  
  if (!state.isVisible) return null

  return (
    <div style={style}>
      {state.message}
    </div>
  )
}

export default Notification

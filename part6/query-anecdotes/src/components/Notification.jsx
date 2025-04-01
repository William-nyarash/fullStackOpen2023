"use client"

import { useEffect } from "react"
import { useNotification } from "./NotificationContext"

const Notification = () => {
  const { state, dispatch } = useNotification()

  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  }

  useEffect(() => {
    let timer = null

    if (state.isVisible) {
      timer = setTimeout(() => {
        dispatch({ type: "clear_notification" })
      }, 5000)
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [state.isVisible, dispatch])

  if (!state.isVisible) return null

  return( 
  <div style={style}>{state.message}</div>
  )
}

export default Notification


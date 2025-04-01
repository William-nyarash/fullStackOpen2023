import { useContext,useReducer, createContext } from "react";

const NotificationContext = createContext();

const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return {
          message: action.payload,
          isVisible: true,
        };
      case 'CLEAR_NOTIFICATION':
        return {
          message: '',
          isVisible: false,
        };
      default:
        return state;
    }
  };
  
  // eslint-disable-next-line react/prop-types
  export const NotificationProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notificationReducer, {
      message: '',
      isVisible: false,
    });
  
    return (
      <NotificationContext.Provider value={{ state, dispatch }}>
        {children}
      </NotificationContext.Provider>
    );
  };
  
  // eslint-disable-next-line react-refresh/only-export-components
  export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
      throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
  };
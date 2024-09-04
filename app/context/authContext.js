import { createContext, useReducer, useEffect, useLayoutEffect, use } from 'react'
export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
      
        case 'LOGOUT':
            return { user: null }
  
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const existingUser = typeof window != 'undefined' && (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))) || null;
    console.log(existingUser)
    // const existingCustomer = typeof window != 'undefined' && localStorage.getItem('customer') && JSON.parse(localStorage.getItem('customer')) || null;

    const [state, dispatch] = useReducer(authReducer, {
        user: existingUser
    })
   
    
    
 

    // useEffect(() => {
    //     const token = localStorage.getItem('token');
    //     const user = localStorage.getItem('user');

    //     const customer = localStorage.getItem('customer');

    //     if (token && user) {
    //         dispatch({ type: 'LOGIN', payload: JSON.parse(user) });
    //     }

    //     if (token && customer) {
    //         dispatch({ type: 'LOGIN_CUSTOMER', payload: JSON.parse(customer) });
    //     }
    // }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}
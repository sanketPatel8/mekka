import { createContext, useReducer, useEffect, useLayoutEffect, use } from 'react'
export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        case 'LOGIN_CUSTOMER':
            return { customer: action.payload }
        case 'LOGOUT_CUSTOMER':
            return { customer: null }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const existingUser = typeof window != 'undefined' && (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))) || null;
    const existingCustomer = typeof window != 'undefined' && (localStorage.getItem('customer') && JSON.parse(localStorage.getItem('customer'))) || null;

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            dispatch({ type: 'LOGIN', payload: user });
        }
        const customer = JSON.parse(localStorage.getItem('customer'));
        if (user) {
            dispatch({ type: 'LOGIN_CUSTOMER', payload: user });
        }
    }, []);

    const [state, dispatch] = useReducer(authReducer, {
        user: existingUser,
        customer: existingCustomer
    })

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}
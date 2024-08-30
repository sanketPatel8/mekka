import { createContext, useReducer, useEffect } from 'react'
export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        // case 'LOGIN_CUSTOMER':
        //     return { ...state, customer: action.payload }
        case 'LOGOUT':
            return { user: null }
        // case 'LOGOUT_CUSTOMER':
        //     return { customer: null }
    //     case 'SET_CLIENT':
    //         return { ...state, client: action.payload }
    //     case 'CLEAR_CLIENT':
    //         return { ...state, client: null };
    // case 'UPDATE_WALLET':
    //     state.user['wallet'] = action.payload;
    //     return { ...state,user: state.user }
        default:
            return state
    }
}

export const AuthContextProvider = ({ children }) => {
    const existingUser = typeof window != 'undefined' && (localStorage.getItem('user') && JSON.parse(localStorage.getItem('user'))) || null;
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
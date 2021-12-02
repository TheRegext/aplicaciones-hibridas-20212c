import { useContext, createContext, useReducer } from "react";

const AuthContext = createContext();

function AuthReducer(state, action) {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };

        case "LOGOUT":
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            return state;
    }
}




// componente funcional
export function AuthProvider({ children }) {
    const [state, dispatch] = useReducer(AuthReducer, { isAuthenticated: false,user: null });


    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const initialLogin = localStorage.getItem('idToken');
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(initialLogin);

    const loginHandler = () => {
        setUserIsLoggedIn(true);
    }

    const logOutHandler = () => {
        localStorage.removeItem('idToken');
        setUserIsLoggedIn(false);
    }

    const verificationHandler = () => {
    }

    const authValues = {
        isLogin: userIsLoggedIn,
        login: loginHandler,
        logout: logOutHandler,
        verification: verificationHandler
    }

    return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
}

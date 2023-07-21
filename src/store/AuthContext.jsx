import {createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
    const [userIsLoggedIn, setUserIsLoggedIn] = useState(false);

    const loginHandler = () => {
        setUserIsLoggedIn(true);
    }

    const authValues={
        isLogin: userIsLoggedIn ,
        login:loginHandler,
    }

    return <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
}

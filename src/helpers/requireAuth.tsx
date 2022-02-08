import { doLogout, isLogged } from "./authHandler";
import { Navigate } from "react-router-dom";

export const RequireAuth = ({children}) => {
    const isAuth = isLogged();

    if(isAuth){
        return children;
    } else {
        return <Navigate to='/signin'/>;
    }
}
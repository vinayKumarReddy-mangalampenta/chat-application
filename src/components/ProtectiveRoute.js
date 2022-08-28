import Cookies from "js-cookie";
import { Route, Navigate } from "react-router";

const ProtectiveRoute = ({ children, redirectTo }) => {
    const name = Cookies.get('ACCESS_TOKEN');
    const userNum = Cookies.get('ACCESS_TOKEN2');
    if (name === undefined || userNum === undefined) {
        return <Navigate to={redirectTo} />
    }
    // return <Route {...props} ></Route>
    return children;
}

export default ProtectiveRoute
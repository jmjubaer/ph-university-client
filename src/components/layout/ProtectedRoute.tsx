/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from "react-router-dom";
import { selectCurrentToken } from "../../redux/features/auth/authSlice";
import { useAppSelector } from "../../redux/hook";

const ProtectedRoute = ({ children }: any) => {
    const token = useAppSelector(selectCurrentToken);
    if (!token) {
        return <Navigate to={"/login"} />;
    }
    return children;
};

export default ProtectedRoute;

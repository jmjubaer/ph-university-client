import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { adminPaths } from "./admin.routes";
import routesGenerator from "../utils/routesGenaretor";
import ProtectedRoute from "../components/layout/ProtectedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <App />
            </ProtectedRoute>
        ),
    },
    {
        path: "/admin",
        element: (
            <ProtectedRoute role='admin'>
                <App />
            </ProtectedRoute>
        ),
        children: routesGenerator(adminPaths),
    },
    {
        path: "/faculty",
        element: (
            <ProtectedRoute role='faculty'>
                <App />
            </ProtectedRoute>
        ),
        children: routesGenerator(adminPaths),
    },
    {
        path: "/student",
        element: (
            <ProtectedRoute role='student'>
                <App />
            </ProtectedRoute>
        ),
        children: routesGenerator(adminPaths),
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
]);

export default router;

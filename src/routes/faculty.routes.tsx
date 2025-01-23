import Course from "../pages/faculty/Course";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";

export const facultyPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <FacultyDashboard />,
    },
    {
        name: "Course",
        path: "course",
        element: <Course />,
    },
];

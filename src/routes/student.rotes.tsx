import EnrolledCourse from "../pages/student/EnrolledCourse";
import OfferedCourse from "../pages/student/OfferedCourse";
import StudentDashboard from "../pages/student/StudentDashboard";

export const studentPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <StudentDashboard />,
    },
    {
        name: "Offered Course",
        path: "offered-courses",
        element: <OfferedCourse />,
    },
    {
        name: "Enrolled Course",
        path: "my-enrolled-courses",
        element: <EnrolledCourse />,
    },
];
import CourseStudent from "../pages/faculty/CourseStudent";
import FacultyDashboard from "../pages/faculty/FacultyDashboard";
import MyCourses from "../pages/faculty/MyCourses";

export const facultyPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <FacultyDashboard />,
    },
    {
        name: "My Courses",
        path: "my-courses",
        element: <MyCourses />,
    },
    {
        path: "courses/:semesterRegistrationId/:courseId",
        element: <CourseStudent />,
    },
];

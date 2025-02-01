import AcademicDepartment from "../pages/admin/academic-management/AcademicDepartment";
import AcademicFaculty from "../pages/admin/academic-management/AcademicFaculty";
import AcademicSemester from "../pages/admin/academic-management/AcademicSemester";
import CreateAcademicDepartment from "../pages/admin/academic-management/CreateAcademicDepartment";
import CreateAcademicFaculty from "../pages/admin/academic-management/CreateAcademicFaculty";
import CreateAcademicSemester from "../pages/admin/academic-management/CreateAcademicSemester";
import AdminDashboard from "../pages/admin/AdminDashboard";
import CreateAdmin from "../pages/admin/user-management/CreateAdmin";
import CreateFaculty from "../pages/admin/user-management/CreateFaculty";
import CreateStudent from "../pages/admin/user-management/CreateStudent";
import StudentData from "../pages/admin/user-management/StudentData";
import StudentDetails from "../pages/admin/user-management/StudentDetails";

export const adminPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <AdminDashboard />,
    },
    {
        name: "Academic Management",
        children: [
            {
                name: "Create A. Semester",
                path: "create-academic-semester",
                element: <CreateAcademicSemester />,
            },
            {
                name: "Academic Semester",
                path: "academic-semester",
                element: <AcademicSemester />,
            },
            {
                name: "Create A. Faculty",
                path: "create-academic-faculty",
                element: <CreateAcademicFaculty />,
            },
            {
                name: "Academic Faculty",
                path: "academic-faculty",
                element: <AcademicFaculty />,
            },
            {
                name: "Create A. Department",
                path: "create-academic-department",
                element: <CreateAcademicDepartment />,
            },
            {
                name: "Academic Department",
                path: "academic-department",
                element: <AcademicDepartment />,
            },
        ],
    },
    {
        name: "User Management",
        children: [
            {
                name: "Create Student",
                path: "create-student",
                element: <CreateStudent />,
            },
            {
                name: "Students",
                path: "students",
                element: <StudentData />,
            },
            {
                path: "students/:studentId",
                element: <StudentDetails />,
            },
            {
                name: "Create Faculty",
                path: "create-faculty",
                element: <CreateFaculty />,
            },
            {
                name: "Create Admin",
                path: "create-admin",
                element: <CreateAdmin />,
            },
        ],
    },
];

// type TAcc = {
//     path: string;
//     element: ReactNode;
// };
// type TSidebarItem = {
//     key: string;
//     label: ReactNode;
//     children?: TSidebarItem[];
// };

// export const adminSidebarItems = adminPaths.reduce(
//     (acc: TSidebarItem[], item) => {
//         if (item.path && item.element) {
//             acc.push({
//                 key: item.name,
//                 label: (
//                     <NavLink to={`/admin/${item.path}`}>{item.name}</NavLink>
//                 ),
//             });
//         }
//         if (item.children) {
//             acc.push({
//                 key: item.name,
//                 label: item.name,
//                 children: item.children.map((child) => ({
//                     key: child.name,
//                     label: (
//                         <NavLink to={`/admin/${child.path}`}>
//                             {child.name}
//                         </NavLink>
//                     ),
//                 })),
//             });
//         }
//         return acc;
//     },
//     []
// );

// export const adminRoutes = adminPaths.reduce((acc: TAcc[], item) => {
//     if (item.path && item.element) {
//         acc.push({
//             path: item.path,
//             element: item.element,
//         });
//     }
//     if (item.children) {
//         item.children.forEach((child) => {
//             acc.push({
//                 path: child.path,
//                 element: child.element,
//             });
//         });
//     }
//     return acc;
// }, []);

//! hardcoded  way

// const adminRoutes = [
//     { path: "dashboard", element: <AdminDashboard /> },
//     { path: "create-admin", element: <CreateAdmin /> },
//     { path: "create-faculty", element: <CreateFaculty /> },
//     { path: "create-student", element: <CreateStudent /> },
// ];

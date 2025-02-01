import { Layout, Menu } from "antd";
import sidebarItemsGenerator from "../../utils/sidebarItemsGenerator";
import { adminPaths } from "../../routes/admin.routes";
import { facultyPaths } from "../../routes/faculty.routes";
import { studentPaths } from "../../routes/student.rotes";
import { useAppSelector } from "../../redux/hook";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";

const { Sider } = Layout;
const userRole = {
    ADMIN: "admin",
    STUDENT: "student",
    FACULTY: "faculty",
};
const Sidebar = () => {
    const user = useAppSelector(selectCurrentUser);
    console.log(user);
    let sidebarItems;
    switch (user?.role) {
        case userRole.ADMIN:
            sidebarItems = sidebarItemsGenerator(adminPaths, userRole.ADMIN);
            break;

        case userRole.FACULTY:
            sidebarItems = sidebarItemsGenerator(
                facultyPaths,
                userRole.FACULTY
            );
            break;

        case userRole.STUDENT:
            sidebarItems = sidebarItemsGenerator(
                studentPaths,
                userRole.STUDENT
            );
            break;

        default:
            break;
    }
    return (
        <Sider
            style={{ height: "100vh", position: "sticky", top: "0", left: "0" }}
            breakpoint='lg'
            collapsedWidth='0'
            // onBreakpoint={(broken) => {
            //     console.log(broken);
            // }}
            // onCollapse={(collapsed, type) => {
            //     console.log(collapsed, type);
            // }}
        >
            <div
                className=''
                style={{
                    color: "white",
                    height: "4rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <h2>Ph University</h2>
            </div>
            <Menu
                theme='dark'
                mode='inline'
                defaultSelectedKeys={["Dashboard"]}
                items={sidebarItems}
            />
            <div className=''></div>
        </Sider>
    );
};

export default Sidebar;

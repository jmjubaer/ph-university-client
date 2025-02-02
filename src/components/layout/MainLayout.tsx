import { Button, Layout } from "antd";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useAppDispatch } from "../../redux/hook";
import { logout } from "../../redux/features/auth/authSlice";

const { Header, Content, Footer } = Layout;

const MainLayout = () => {
    const dispatch = useAppDispatch();
    const handleLogout = () => {
        dispatch(logout());
    };
    return (
        <Layout style={{ height: "100%" }}>
            <Sidebar />
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        zIndex: "99",
                    }}>
                    <Button
                        onClick={() => handleLogout()}
                        type='primary'
                        style={{ marginRight: "20px" }}>
                        Log out
                    </Button>
                </Header>
                <Content style={{ margin: "24px 16px 0" }}>
                    <Outlet />
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};

export default MainLayout;

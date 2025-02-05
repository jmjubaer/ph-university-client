/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLoginMutation } from "../redux/features/auth/authApi";
import { Button, Row } from "antd";
import { useAppDispatch } from "../redux/hook";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { FieldValues } from "react-hook-form";

const Login = () => {
    const navigate = useNavigate();
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();

    const onSubmit = async (data: FieldValues) => {
        const tostId = toast.loading("User is logging");
        try {
            const response = await login(data).unwrap();
            const user = verifyToken(response.data.accessToken) as TUser;
            dispatch(setUser({ user, token: response.data.accessToken }));
            toast.success("User logged in successfully", {
                id: tostId,
                duration: 2000,
            });
            console.log(response);
            if (response.success) {
                if (response.data.needsPasswordChange) {
                    navigate(`/change-password`);
                    toast.success("Please reset your password", {
                        id: tostId,
                        duration: 2000,
                    });
                    return;
                } else {
                    navigate(
                        `/${
                            user.role === "supperAdmin" ? "admin" : user.role
                        }/dashboard`
                    );
                }
            }
        } catch (error: any) {
            toast.error(error.message, { id: tostId });
        }
    };
    const defaultValues = {
        id: "2025010001",
        password: "student123",
    };
    return (
        <Row justify='center' align='middle' style={{ height: "100vh" }}>
            <PHForm onSubmit={onSubmit} defaultValues={defaultValues}>
                <PHInput type='text' label='Id:' name='id' />
                <PHInput type='text' label='Password:' name='password' />
                <Button htmlType='submit'>Login</Button>
            </PHForm>
        </Row>
    );
};

export default Login;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { Button } from "antd";
import { useAppDispatch } from "../redux/hook";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
    const navigate = useNavigate();
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const { handleSubmit, register } = useForm({
        defaultValues: {
            id: "A-0001",
            password: "admin123",
        },
    });
    const handleLogin = async (data: { id: string; password: string }) => {
        try {
            const tostId = toast.loading("User is logging");
            const response = await login(data).unwrap();
            const user = verifyToken(response.data.accessToken) as TUser;
            dispatch(setUser({ user, token: response.data.accessToken }));
            toast.success("User logged in successfully", {
                id: tostId,
                duration: 2000,
            });
            if (response.success) {
                navigate(`/${user.role}/dashboard`);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    return (
        <div>
            <form onSubmit={handleSubmit(handleLogin)}>
                <label htmlFor='username'>Id:</label>
                <input type='text' id='username' {...register("id")} />

                <label htmlFor='password'>Password:</label>
                <input type='text' id='password' {...register("password")} />
                <Button htmlType='submit'>Login</Button>
            </form>
        </div>
    );
};

export default Login;

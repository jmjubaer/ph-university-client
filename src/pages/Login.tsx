import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { Button } from "antd";
import { useAppDispatch } from "../redux/hook";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";

const Login = () => {
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const { handleSubmit, register } = useForm({
        defaultValues: {
            id: "A-0001",
            password: "admin123",
        },
    });
    // console.log(error);
    const handleLogin = async (data: { id: string; password: string }) => {
        const response = await login(data).unwrap();
        const user = verifyToken(response.data.accessToken);
        dispatch(setUser({ user, token: response.data.accessToken }));
        // console.log(object); 
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { Button } from "antd";

const Login = () => {
    const [login, { data: response, error }] = useLoginMutation();
    const { handleSubmit, register } = useForm({
        defaultValues: {
            id: "A-0001",
            password: "admin123",
        },
    });
    console.log(response);
    console.log(error);
    const handleLogin = (data: { id: string; password: string }) => {
        login(data);
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

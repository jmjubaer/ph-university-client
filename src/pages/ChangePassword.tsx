/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Row } from "antd";
import { useAppDispatch } from "../redux/hook";
import { logout } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { FieldValues } from "react-hook-form";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement.api";

const ChangePassword = () => {
    const navigate = useNavigate();
    const [changePassword] = useChangePasswordMutation();
    const dispatch = useAppDispatch();

    const onSubmit = async (data: FieldValues) => {
        const tostId = toast.loading("Changing....");
        try {
            const response = await changePassword(data).unwrap();
            console.log(response);
            if (response.success) {
                navigate(`/login`);
                dispatch(logout());
                toast.success("Password change successfully. Login Now", {
                    id: tostId,
                });
            }
        } catch (error: any) {
            toast.error(error?.message, { id: tostId });
        }
    };
    return (
        <Row justify='center' align='middle' style={{ height: "100vh" }}>
            <PHForm onSubmit={onSubmit}>
                <PHInput type='text' label='Old Password:' name='oldPassword' />
                <PHInput type='text' label='New Password:' name='newPassword' />
                <Button htmlType='submit'>Change</Button>
            </PHForm>
        </Row>
    );
};

export default ChangePassword;

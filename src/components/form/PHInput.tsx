import { Form } from "antd";
import Input from "antd/es/input/Input";
import { Controller } from "react-hook-form";

type TInputProps = {
    name: string;
    type: string;
    label: string;
};
const PHInput = ({ name, type, label }: TInputProps) => {
    return (
        <div style={{ marginBottom: "20px" }}>
            <Controller
                name={name}
                render={({ field }) => (
                    <Form.Item label={label}> 
                        <Input {...field} type={type} id={name} />
                    </Form.Item>
                )}
            />
        </div>
    );
};

export default PHInput;

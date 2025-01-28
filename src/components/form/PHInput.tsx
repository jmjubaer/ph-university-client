import Input from "antd/es/input/Input";
import { Controller } from "react-hook-form";

type TInputProps = {
    name: string;
    type: string;
    label: string;
};
const PHInput = ({ name, type, label }: TInputProps) => {
    return (
        <div>
            {label && <label htmlFor={name}>{label}</label>}
            <Controller
                name={name}
                render={({ field }) => (
                    <Input {...field} type={type} id={name} />
                )}
            />
        </div>
    );
};

export default PHInput;

import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
    name: string;
    label?: string;
    options: {
        value: string;
        label: string;
        disabled?: boolean;
    }[];
};
const PHSelect = ({ label, name, options }: TSelectProps) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={label}>
                    <Select
                        {...field}
                        style={{ width: "100%" }}
                        //   onChange={handleChange}
                        options={options}
                    />
                    {error && <small style={{color: "red"}}>{error.message}</small>}
                </Form.Item>
            )}
        />
    );
};

export default PHSelect;

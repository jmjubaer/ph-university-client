import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
    name: string;
    label?: string;
    disabled?: boolean;
    mode?: "multiple" | undefined;
    options:
        | {
              value: string;
              label: string;
              disabled?: boolean;
          }[]
        | undefined;
};
const PHSelect = ({ label, name, options, disabled, mode }: TSelectProps) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => (
                <Form.Item label={label}>
                    <Select
                        mode={mode}
                        disabled={disabled}
                        {...field}
                        style={{ width: "100%" }}
                        //   onChange={handleChange}
                        options={options}
                    />
                    {error && (
                        <small style={{ color: "red" }}>{error.message}</small>
                    )}
                </Form.Item>
            )}
        />
    );
};

export default PHSelect;

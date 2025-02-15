import { Form } from "antd";
import { ReactNode } from "react";
import {
    FieldValues,
    FormProvider,
    SubmitHandler,
    useForm,
} from "react-hook-form";

type TFormConfig = {
    defaultValues?: Record<string, any>;
    resolver?: any;
};
type TFormProps = {
    onSubmit: SubmitHandler<FieldValues>;
    children: ReactNode; // optional default values for form fields  (default: {})  // TODO: add validation and sanitization for default values  (default: {})  // TODO: add validation and sanitization for default values  (default: {})  // TODO: add validation and sanitization for default values  (default: {})  // TODO: add validation and sanitization for default values  (default: {})  // TODO: add validation and sanitization for
} & TFormConfig;
const PHForm = ({
    onSubmit,
    children,
    defaultValues,
    resolver,
}: TFormProps) => {
    const formConfig: TFormConfig = {};
    if (defaultValues) {
        formConfig["defaultValues"] = defaultValues;
    }
    if (resolver) {
        formConfig["resolver"] = resolver;
    }
    const methods = useForm(formConfig);
    const handleSubmit: SubmitHandler<FieldValues> = (data) => {
        onSubmit(data);
        // methods.reset();
    };
    return (
        <FormProvider {...methods}>
            <Form
                layout='vertical'
                onFinish={methods.handleSubmit(handleSubmit)}>
                {children}
            </Form>
        </FormProvider>
    );
};

export default PHForm;

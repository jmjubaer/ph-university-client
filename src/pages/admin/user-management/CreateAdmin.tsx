/* eslint-disable @typescript-eslint/no-explicit-any */
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constant/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import { useAddAdminMutation } from "../../../redux/features/admin/userManagement.api";
import { toast } from "sonner";
import { TAcademicDepartment, TResponse } from "../../../types";

const CreateAdmin = () => {
    const adminData = {
        password: "admin123",
        admin: {
            name: {
                firstName: "Alice",
                middleName: "M.",
                lastName: "Johnson",
            },
            gender: "female",
            // dateOfBirth: "1990-05-15",
            bloogGroup: "A+",

            email: "jmjubaer3927@gmail.com.com",
            contactNo: "123-456-7890",
            emergencyContactNo: "987-654-3210",
            presentAddress: "789 Pine Street, Metropolis",
            permanentAddress: "101 Maple Avenue, Metropolis",

            designation: "System Administrator",
            profileImg: "https://example.com/profiles/alice-johnson.jpg",
        },
    };

    const [CreateAdmin] = useAddAdminMutation();

    const handleCreateAdmin: SubmitHandler<FieldValues> = async (data) => {
        // console.log(data);
        const toastId = toast.loading("Faculty creating .....");
        try {
            const adminData = {
                password: "admin123",
                admin: data,
            };
            const formData = new FormData();
            formData.append("data", JSON.stringify(adminData));
            formData.append("file", data.image);
            const response = (await CreateAdmin(
                formData
            )) as TResponse<TAcademicDepartment>;
            console.log(response);
            if (response?.error) {
                toast.error(response?.error?.data?.message, { id: toastId });
            } else {
                toast.success("Student created successfully", { id: toastId });
            }
        } catch (error: any) {
            toast.error(error?.message);
        }
    };
    return (
        <div>
            <PHForm
                onSubmit={handleCreateAdmin}
                defaultValues={adminData.admin}>
                <Divider>Personal Info</Divider>
                <Row gutter={8}>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput
                            type='text'
                            label='First name:'
                            name='name.firstName'
                        />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput
                            type='text'
                            label='Middle name:'
                            name='name.middleName'
                        />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput
                            type='text'
                            label='Last name:'
                            name='name.lastName'
                        />
                    </Col>{" "}
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHSelect
                            label='Gender:'
                            name='gender'
                            options={genderOptions}
                        />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHSelect
                            label='Blood Group:'
                            name='bloogGroup'
                            options={bloodGroupOptions}
                        />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHDatePicker
                            label='Date of Birth:'
                            name='dateOfBirth'
                        />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <Controller
                            name='image'
                            render={({
                                field: { onChange, value, ...field },
                            }) => (
                                <Form.Item>
                                    <Input
                                        {...field}
                                        type='file'
                                        value={value?.fileName}
                                        onChange={(e) =>
                                            onChange(e?.target?.files?.[0])
                                        }
                                        accept='image/*'
                                    />
                                </Form.Item>
                            )}
                        />
                    </Col>
                </Row>

                <Divider>Personal Info</Divider>
                <Row gutter={8}>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput type='email' label='Email:' name='email' />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput
                            type='text'
                            label='Contact No:'
                            name='contactNo'
                        />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput
                            type='text'
                            label='Emergency Contact No:'
                            name='emergencyContactNo'
                        />
                    </Col>{" "}
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput
                            type='text'
                            label='Present Address:'
                            name='presentAddress'
                        />
                    </Col>{" "}
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput
                            type='text'
                            label='Permanent Address:'
                            name='permanentAddress'
                        />
                    </Col>
                </Row>

                <Divider>Academic Info</Divider>
                <Row gutter={8}>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput
                            type='text'
                            label='Designation:'
                            name='designation'
                        />
                    </Col>
                </Row>
                <Button htmlType='submit'>Submit</Button>
            </PHForm>
        </div>
    );
};

export default CreateAdmin;

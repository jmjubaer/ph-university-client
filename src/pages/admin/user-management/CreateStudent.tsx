import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import PHInput from "../../../components/form/PHInput";
import { Button, Col, Divider, Row } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { bloodGroupOptions, genderOptions } from "../../../constant/global";
import PHDatePicker from "../../../components/form/PHDatePicker";
import {
    useGetAllAcademicDepartmentQuery,
    useGetAllSemestersQuery,
} from "../../../redux/features/admin/academicManagment.api";
import { TAcademicSemester } from "../../../types/academicSemester.type";
import { TAcademicDepartment } from "../../../types/academicDepartment.type";

const CreateStudent = () => {
    const studentData = {
        password: "student123",
        student: {
            name: {
                firstName: "Md",
                middleName: "jubaer",
                lastName: "jm",
            },
            gender: "male",
            // dateOfBirth: "2002-05-15",
            bloodGroup: "O+",

            email: "jmjubaerp3927@gmail.com",
            contactNo: "+12324564945",
            emergencyContactNo: "+0987654321",
            presentAddress: "123 Main Street, Springfield",
            permanentAddress: "456 Elm Street, Springfield",

            guardian: {
                fatherName: "Robert Doe",
                fatherOccupation: "Engineer",
                fatherContactNo: "+1122334455",
                motherName: "Jane Doe",
                motherOccupation: "Teacher",
                motherContactNo: "+2233445566",
            },
            localGuardian: {
                name: "Uncle Ben",
                occupation: "Businessman",
                contactNo: "+3344556677",
                address: "789 Oak Avenue, Springfield",
            },
            admissionSemester: "6787837743069504ff2a2f4f",
            academicDepartment: "678781a9251ff5bc13ea761c",
        },
    };
    const { data: semesterData, isLoading: SLoading } =
        useGetAllSemestersQuery(undefined);
    const { data: departmentData, isLoading: DLoading } =
        useGetAllAcademicDepartmentQuery(undefined);
    const semesterOptions = semesterData?.data?.map(
        (data: TAcademicSemester) => ({
            key: data._id,
            value: data._id,
            label: ` ${data.name} ${data.year}`,
        })
    );
    const departmentOptions = departmentData?.data?.map(
        (data: TAcademicDepartment) => ({
            key: data._id,
            value: data._id,
            label: data.name,
        })
    );
    const handleCreateStudent: SubmitHandler<FieldValues> = (data) => {
        console.log(data);

        //     const formData = new FormData();
        //     formData.append("data", JSON.stringify(data));
        //     console.log(Object.fromEntries(formData));
    };
    return (
        <div>
            <PHForm
                onSubmit={handleCreateStudent}
                defaultValues={studentData.student}>
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
                            name='bloodGroup'
                            options={bloodGroupOptions}
                        />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHDatePicker
                            label='Date of Birth:'
                            name='dateOfBirth'
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

                <Divider>Guardian Info</Divider>
                <Row gutter={8}>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput
                            type='text'
                            label='Father name:'
                            name='guardian.fatherName'
                        />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput
                            type='text'
                            label='Father occupation:'
                            name='guardian.fatherOccupation'
                        />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput
                            type='text'
                            label='Father C. No:'
                            name='guardian.fatherContactNo'
                        />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput
                            type='text'
                            label='Mother Name:'
                            name='guardian.motherName'
                        />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput
                            type='text'
                            label='Mother Occupation:'
                            name='guardian.motherOccupation'
                        />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput
                            type='text'
                            label='Mother C. No:'
                            name='guardian.motherContactNo'
                        />
                    </Col>
                </Row>

                <Divider>Local Guardian Info</Divider>
                <Row gutter={8}>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput
                            type='text'
                            label='Name:'
                            name='localGuardian.name'
                        />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput
                            type='text'
                            label='Occupation:'
                            name='localGuardian.occupation'
                        />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput
                            type='text'
                            label='Contact No:'
                            name='localGuardian.contactNo'
                        />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHInput
                            type='text'
                            label='Address:'
                            name='localGuardian.address'
                        />
                    </Col>
                </Row>

                <Divider>Academic Info</Divider>
                <Row gutter={8}>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHSelect
                            options={departmentOptions}
                            disabled={DLoading}
                            label='Academic Department:'
                            name='academicDepartment'
                        />
                    </Col>
                    <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
                        <PHSelect
                            options={semesterOptions}
                            disabled={SLoading}
                            label='Academic Semester:'
                            name='admissionSemester'
                        />
                    </Col>
                </Row>
                <Button htmlType='submit'>Submit</Button>
            </PHForm>
        </div>
    );
};

export default CreateStudent;

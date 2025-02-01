/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicDepartmentSchema } from "../../../Schema/academicManagement.schema.";
import { toast } from "sonner";
import { TAcademicDepartment, TAcademicFaculty, TResponse } from "../../../types";
import {
    useAddAcademicDepartmentMutation,
    useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagment.api";

const CreateAcademicDepartment = () => {
    const { data: facultyData, isLoading: facultyLoading } =
        useGetAllAcademicFacultyQuery(undefined);
    const [createAcademicDepartment] = useAddAcademicDepartmentMutation();
    const handleCreateAcademicDepartment: SubmitHandler<FieldValues> = async (
        data
    ) => {
        const toastId = toast.loading("Creating ....");
        try {
            const response = (await createAcademicDepartment(
                data
            )) as TResponse<TAcademicDepartment>;

            if (response?.error) {
                toast.error(response?.error?.data?.message, { id: toastId });
            } else {
                toast.success("Academic Semester created successfully", {
                    id: toastId,
                });
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    const facultyOptions = facultyData?.data?.map(
        (faculty: TAcademicFaculty) => {
            if (facultyLoading) {
                return {
                    value: null,
                    label: "Loading...",
                };
            }
            return {
                value: faculty._id,
                label: faculty.name,
            };
        }
    );
    return (
        <Flex justify='center' align='center'>
            <Col span={6}>
                <PHForm
                    onSubmit={handleCreateAcademicDepartment}
                    resolver={zodResolver(academicDepartmentSchema)}>
                    <PHInput name='name' type='text' label='Department Name' />
                    <PHSelect
                        name='academicFaculty'
                        options={facultyOptions}
                        label='Select academic faculty'
                    />
                    <Button htmlType='submit'>Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicDepartment;

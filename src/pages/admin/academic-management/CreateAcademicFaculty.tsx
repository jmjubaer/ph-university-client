import { Button, Col, Flex } from "antd";
import PHForm from "../../../components/form/PHForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { academicFacultySchema } from "../../../Schema/academicSemester.schema.";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHInput from "../../../components/form/PHInput";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicFaculty.api";
import { TAcademicFaculty } from "../../../types/academicSemester.type";
import { TResponse } from "../../../types";

const CreateAcademicFaculty = () => {
    const [CreateAcademicFaculty] = useAddAcademicFacultyMutation();
    const handleCreateAcademicSemester: SubmitHandler<FieldValues> = async (
        data
    ) => {
        const tostId = toast.loading("creating ....");
        try {
            const response = (await CreateAcademicFaculty(
                data
            )) as TResponse<TAcademicFaculty>;
            if (response?.error) {
                toast.error(response?.error?.data?.message, { id: tostId });
            } else {
                toast.success("Academic Semester created successfully", {
                    id: tostId,
                });
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    return (
        <Flex justify='center' align='center'>
            <Col span={6}>
                <PHForm
                    onSubmit={handleCreateAcademicSemester}
                    resolver={zodResolver(academicFacultySchema)}>
                    <PHInput type='text' name='name' label='Faculty Name:' />
                    <Button htmlType='submit'>Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicFaculty;

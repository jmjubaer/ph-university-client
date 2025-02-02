/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHInput from "../../../components/form/PHInput";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { TAcademicDepartment, TResponse } from "../../../types";
import {
    useAddCourseMutation,
    useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseMangement.api";

const CreateCourse = () => {
    const { data: courseData, isLoading: courseLoading } =
        useGetAllCoursesQuery([{ name: "limit", value: 100000 }]);
    const [createCourse] = useAddCourseMutation();
    console.log(courseData);
    const handleCreateCourse: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating ....");
        try {
            const courseData = {
                ...data,
                code: Number(data.code),
                credits: Number(data.credits),
                preRequisiteCourse: data?.preRequisiteCourse?.map(
                    (courseId: any) => ({
                        course: courseId,
                        isDeleted: false,
                    })
                ),
            };
            const response = (await createCourse(
                courseData
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
    const courseOptions = courseData?.data?.map((course: any) => {
        if (courseLoading) {
            return {
                value: null,
                label: "Loading...",
            };
        }
        return {
            value: course._id,
            label: course.title,
        };
    });
    return (
        <Flex justify='center' align='center'>
            <Col span={6}>
                <PHForm onSubmit={handleCreateCourse}>
                    <PHInput name='title' type='text' label='Title' />
                    <PHInput name='prefix' type='text' label='Prefix' />
                    <PHInput name='code' type='number' label='Code' />
                    <PHInput name='credits' type='number' label='Credits' />
                    <PHSelect
                        mode='multiple'
                        name='preRequisiteCourse'
                        options={courseOptions}
                        label='Select academic faculty'
                    />
                    <Button htmlType='submit'>Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateCourse;

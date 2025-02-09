import { Button, Col, Flex } from "antd";
import { useGetFacultyCourseQuery } from "../../redux/features/faculty/courseManagement.api";
import PHForm from "../../components/form/PHForm";
import PHSelect from "../../components/form/PHSelect";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
    const navigate = useNavigate();
    const { data: facultyCourses, isFetching } =
        useGetFacultyCourseQuery(undefined);
    console.log(facultyCourses);
    const handleCourseStudent: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
        navigate(
            `/faculty/courses/${data.semesterRegistration}/${data.course}`
        );
        // Offer course logic
    };
    const semesterOptions = facultyCourses?.data?.map((item: any) => ({
        label: `${item?.academicSemester?.name} ${item?.academicSemester?.year}`,
        value: item.semesterRegistration._id,
    }));
    const courseOptions = facultyCourses?.data?.map((item: any) => ({
        label: item.course.title,
        value: item.course._id,
    }));
    return (
        <Flex justify='center' align='center'>
            <Col span={6}>
                <PHForm onSubmit={handleCourseStudent}>
                    <PHSelect
                        disabled={isFetching}
                        name='semesterRegistration'
                        options={semesterOptions}
                        label='Select a registered semester'
                    />
                    <PHSelect
                        disabled={isFetching}
                        name='course'
                        options={courseOptions}
                        label='Select a course'
                    />
                    <Button htmlType='submit'>Show Student</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default MyCourses;

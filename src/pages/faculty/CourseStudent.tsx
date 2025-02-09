import { useParams } from "react-router-dom";
import {
    useGetFacultyCourseQuery,
    useUpdateMarksMutation,
} from "../../redux/features/faculty/courseManagement.api";
import { Button, Modal, Pagination, Table } from "antd";
import { useState } from "react";
import PHForm from "../../components/form/PHForm";
import PHInput from "../../components/form/PHInput";

const CourseStudent = () => {
    const [page, setPage] = useState(1);

    const { semesterRegistrationId, courseId } = useParams();
    const { data: facultyCourses, isFetching } = useGetFacultyCourseQuery([
        { name: "semesterRegistration", value: semesterRegistrationId },
        { name: "course", value: courseId },
        { name: "page", value: page },
        { name: "limit", value: 10 },
        // { name: "sort", value: "id" },
    ]);
    // console.log(facultyCourses);
    const tableData = facultyCourses?.data?.map(
        ({ _id, student, semesterRegistration, offeredCourse }: any) => ({
            key: _id,
            roll: student.id,
            name: student.fullName,
            email: student.email,
            semesterRegistration: semesterRegistration._id,
            offeredCourse: offeredCourse._id,
            student: student._id,
        })
    );
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Roll No.",
            dataIndex: "roll",
        },
        {
            title: "Action",
            key: "action",
            render: (item: any) => {
                return <AssignFacultyModal courseInfo={item} />;
            },
            width: "1%",
        },
    ];
    return (
        <div>
            <Table<any>
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                pagination={false}
            />
            <Pagination
                onChange={(value) => setPage(value)}
                total={facultyCourses?.meta?.total}
                pageSize={3}
                current={page}
            />
        </div>
    );
};

export default CourseStudent;
const AssignFacultyModal = ({ courseInfo }: any) => {
    const [updateMarks] = useUpdateMarksMutation();
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleSubmit = async (data: any) => {
        const updateData = {
            semesterRegistration: courseInfo.semesterRegistration,
            offeredCourse: courseInfo.offeredCourse,
            student: courseInfo.student,
            courseMarks: {
                classTest1: Number(data.classTest1),
                midTerm: Number(data.midTerm),
                classTest2: Number(data.classTest2),
                finalTerm: Number(data.finalTerm),
            },
        };
        console.log(updateData);

        const res = await updateMarks(updateData);
        console.log(res);
        if (res.data.success) {
            setOpen(false);
        }
    };

    return (
        <>
            <Button type='primary' onClick={() => showModal()}>
                Assign Faculty
            </Button>
            <Modal
                title='Change user status'
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}>
                <PHForm onSubmit={handleSubmit}>
                    <PHInput
                        type='text'
                        name='classTest1'
                        label='Class Test 1'
                    />
                    <PHInput type='text' name='midTerm' label='Midterm' />
                    <PHInput
                        type='text'
                        name='classTest2'
                        label='Class Test 2'
                    />
                    <PHInput type='text' name='finalTerm' label='Final' />
                    <div style={{ display: "flex", justifyContent: "end" }}>
                        <Button type='primary' htmlType='submit'>
                            Assign
                        </Button>
                    </div>
                </PHForm>
            </Modal>
        </>
    );
};

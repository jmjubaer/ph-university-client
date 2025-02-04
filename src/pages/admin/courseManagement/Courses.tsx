/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Modal, Pagination, Table, TableColumnsType } from "antd";
import { TStudent } from "../../../types";
import { useState } from "react";
import {
    useAssignFacultiesMutation,
    useGetAllCoursesQuery,
} from "../../../redux/features/admin/courseMangement.api";
import PHForm from "../../../components/form/PHForm";
import PHSelect from "../../../components/form/PHSelect";
import { useGetAllFacultyQuery } from "../../../redux/features/admin/userManagement.api";
type TTableDataType = Pick<TStudent, "fullName" | "email" | "id">;

const Courses = () => {
    const [page, setPage] = useState(1);
    const { data: courseData, isFetching } = useGetAllCoursesQuery([
        { name: "page", value: page },
        { name: "limit", value: 10 },
        { name: "sort", value: "id" },
    ]);

    const tableData = courseData?.data?.map(
        ({ _id, title, code, preRequisiteCourse }: any) => ({
            key: _id,
            title,
            code,
            preRequisiteCourse: preRequisiteCourse?.map(
                (course: any, idx: number) => {
                    return ` (${idx + 1}). ${course.course.title}   `;
                }
            ),
        })
    );
    const columns: TableColumnsType<TTableDataType> = [
        {
            title: "Title",
            dataIndex: "title",
        },
        {
            title: "Code",
            dataIndex: "code",
        },
        {
            title: "Pre R. Course.",
            dataIndex: "preRequisiteCourse",
            width: "20%",
        },
        {
            title: "Action",
            key: "action",
            render: (item) => {
                return <AssignFacultyModal item={item} />;
            },
            width: "1%",
        },
    ];
    return (
        <div>
            <Table<TTableDataType>
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                pagination={false}
            />
            <Pagination
                onChange={(value) => setPage(value)}
                total={courseData?.meta?.total}
                pageSize={10}
                current={page}
            />
        </div>
    );
};

const AssignFacultyModal = ({ item }: any) => {
    const { data: faculties } = useGetAllFacultyQuery(undefined);
    const [AssignFaculty] = useAssignFacultiesMutation();
    const options = faculties?.data?.map((data: any) => ({
        key: data._id,
        value: data._id,
        label: data.fullName,
    }));
    const [open, setOpen] = useState(false);
    const showModal = () => {
        setOpen(true);
    };
    const handleSubmit = async (data: any) => {
        const res = await AssignFaculty({ courseId: item.key, data });
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
                    <PHSelect
                        name='faculties'
                        options={options}
                        mode='multiple'
                    />
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

export default Courses;

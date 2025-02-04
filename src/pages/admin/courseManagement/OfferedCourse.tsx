/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Pagination, Table, TableColumnsType } from "antd";
import { TStudent } from "../../../types";
import { useState } from "react";
import { useGetAllOfferedCourseQuery } from "../../../redux/features/admin/courseMangement.api";
type TTableDataType = Pick<TStudent, "fullName" | "email" | "id">;

const OfferedCourse = () => {
    const [page, setPage] = useState(1);
    const { data: offeredCourseData, isFetching } = useGetAllOfferedCourseQuery(
        [
            { name: "page", value: page },
            { name: "limit", value: 10 },
            { name: "sort", value: "id" },
        ]
    );
    console.log(offeredCourseData);
    const tableData = offeredCourseData?.data?.map(
        ({ _id, course, faculty }: any) => {
            console.log(course.title);
            return {
                key: _id,
                course: course?.title,
                faculty: faculty?.fullName,
            };
        }
    );
    const columns: TableColumnsType<TTableDataType> = [
        {
            title: "Course Title",
            dataIndex: "course",
        },
        {
            title: "Assign Faculty",
            dataIndex: "faculty",
        },
        {
            title: "Action",
            key: "action",
            render: () => {
                return <Button>Details</Button>;
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
                total={offeredCourseData?.meta?.total}
                pageSize={10}
                current={page}
            />
        </div>
    );
};

export default OfferedCourse;

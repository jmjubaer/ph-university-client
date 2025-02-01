import { Button, Pagination, Space, Table, TableColumnsType } from "antd";
import { TStudent } from "../../../types";
import { useGetAllStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { useState } from "react";
type TTableDataType = Pick<TStudent, "fullName" | "email" | "id">;

const StudentData = () => {
    const [page, setPage] = useState(1);
    const { data: studentData, isFetching } = useGetAllStudentQuery([
        { name: "page", value: page },
        { name: "limit", value: 3 },
        { name: "sort", value: "id" },
    ]);
    const tableData = studentData?.data?.map(
        ({ _id, id, fullName, email }: TStudent) => ({
            key: _id,
            id,
            fullName,
            email,
        })
    );
    const columns: TableColumnsType<TTableDataType> = [
        {
            title: "Name",
            dataIndex: "fullName",
        },
        {
            title: "Email",
            dataIndex: "email",
        },
        {
            title: "Roll No.",
            dataIndex: "id",
        },
        {
            title: "Action",
            render: () => {
                return (
                    <Space>
                        <Button type='primary'>Update</Button>
                        <Button type='primary'>Details</Button>
                        <Button type='primary' danger>
                            Block
                        </Button>
                    </Space>
                );
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
                showSorterTooltip={{ target: "sorter-icon" }}
                pagination={false}
            />
            <Pagination
                onChange={(value) => setPage(value)}
                total={studentData?.meta?.total}
                pageSize={3}
                current={page}
            />
        </div>
    );
};

export default StudentData;

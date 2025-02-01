import { Button, Space, Table, TableColumnsType } from "antd";
import { TStudent } from "../../../types";
import { useGetAllStudentQuery } from "../../../redux/features/admin/userManagement.api";
type TTableDataType = Pick<TStudent, "fullName" | "email" | "id">;

const StudentData = () => {
    const { data: studentData, isFetching } = useGetAllStudentQuery(undefined);
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
            />
        </div>
    );
};

export default StudentData;

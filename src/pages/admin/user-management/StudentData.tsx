import {
    Button,
    Modal,
    Pagination,
    Space,
    Table,
    TableColumnsType,
} from "antd";
import { TStudent } from "../../../types";
import {
    useGetAllStudentQuery,
    useUpdateUserStatusMutation,
} from "../../../redux/features/admin/userManagement.api";
import { useState } from "react";
import { Link } from "react-router-dom";
type TTableDataType = Pick<TStudent, "fullName" | "email" | "id">;

const StudentData = () => {
    const [page, setPage] = useState(1);
    const { data: studentData, isFetching,refetch } = useGetAllStudentQuery([
        { name: "page", value: page },
        { name: "limit", value: 3 },
        { name: "sort", value: "id" },
    ]);
    const [updateStatus] = useUpdateUserStatusMutation();
    const [open, setOpen] = useState(false);
    const [currentUser, setCurrentUser] = useState<any>(undefined);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [modalText, setModalText] = useState(
        "If you want to change the use status. Please enter OK"
    );

    const showModal = (user: any) => {
        setCurrentUser(user);
        setOpen(true);
    };

    const handleOk = async () => {
        setModalText("User status is updating ...");
        setConfirmLoading(true);
        const expectedStatus =
            currentUser?.status === "blocked" ? "in-progress" : "blocked";
        const status = { status: expectedStatus };

        console.log(status);
        const res = await updateStatus({ id: currentUser?._id, status });
        console.log(res);
        if (res.data.success) {
            setOpen(false);
            setConfirmLoading(false);
            refetch()
        }
    };

    const tableData = studentData?.data?.map(
        ({ _id, id, fullName, email, user }: TStudent) => ({
            key: _id,
            id,
            fullName,
            email,
            user,
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
            key: "action",
            render: (item) => {
                return (
                    <Space>
                        <Link to={`/admin/students/${item.key}`}>
                            <Button type='primary'>Details</Button>
                        </Link>
                        <Button
                            type='primary'
                            onClick={() => showModal(item.user)}
                            danger>
                            {item?.user?.status === "blocked"
                                ? "Unblock"
                                : "Block"}
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
                pagination={false}
            />
            <Pagination
                onChange={(value) => setPage(value)}
                total={studentData?.meta?.total}
                pageSize={3}
                current={page}
            />
            <Modal
                title='Change user status'
                open={open}
                onOk={() => handleOk()}
                confirmLoading={confirmLoading}
                onCancel={() => setOpen(false)}>
                <p>{modalText}</p>
            </Modal>
        </div>
    );
};

export default StudentData;

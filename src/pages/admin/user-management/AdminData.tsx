/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Modal,
    Pagination,
    Space,
    Table,
    TableColumnsType,
} from "antd";
import { TAdmin, TFaculty } from "../../../types";
import {
    useGetAllAdminQuery,
    useUpdateUserStatusMutation,
} from "../../../redux/features/admin/userManagement.api";
import { useState } from "react";
type TTableDataType = Pick<TFaculty, "fullName" | "email" | "designation">;

const AdminData = () => {
    const [page, setPage] = useState(1);
    const {
        data: adminData,
        isFetching,
        refetch,
    } = useGetAllAdminQuery([
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
            refetch();
        }
    };

    const tableData = adminData?.data?.map(
        ({ _id, designation, fullName, email, user }: TAdmin) => ({
            key: _id,
            fullName,
            email,
            user,
            designation,
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
            title: "Designation.",
            dataIndex: "designation",
        },
        {
            title: "Action",
            key: "action",
            render: (item) => {
                return (
                    <Space>
                        {/* <Link to={`/admin/students/${item.key}`}> */}
                        <Button type='primary'>Details</Button>
                        {/* </Link> */}
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
    console.log(adminData);
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
                total={adminData?.meta?.total}
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

export default AdminData;

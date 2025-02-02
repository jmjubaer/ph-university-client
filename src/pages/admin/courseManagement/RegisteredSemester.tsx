/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Button,
    Dropdown,
    MenuProps,
    Space,
    Table,
    TableColumnsType,
    Tag,
} from "antd";
import { TAcademicDepartment } from "../../../types";
import {
    useChangeRegisteredSemesterStatusMutation,
    useGetAllRegisteredSemesterQuery,
} from "../../../redux/features/admin/courseMangement.api";
import moment from "moment";
import { DownOutlined } from "@ant-design/icons";
import { useState } from "react";
type TTableDataType = Pick<TAcademicDepartment, "name" | "academicFaculty">;
const RegisteredSemester = () => {
    const [id, setId] = useState("");
    const { data: RSemesterData, isFetching } =
        useGetAllRegisteredSemesterQuery(undefined);
    const [updateStatus] = useChangeRegisteredSemesterStatusMutation();
    const items: MenuProps["items"] = [
        {
            label: "Upcoming",
            key: "UPCOMING",
        },
        {
            label: "Ongoing",
            key: "ONGOING",
        },
        {
            label: "Ended",
            key: "ENDED",
        },
    ];

    const handleChangeStatus = async (data: any) => {
        console.log(data);
        const updateData = {
            id,
            data: {
                status: data.key,
            },
        };
        await updateStatus(updateData);
    };
    const menuProps = {
        items,
        onClick: handleChangeStatus,
    };
    const tableData = RSemesterData?.data?.map(
        ({ _id, status, academicSemester, startDate, endDate }: any) => ({
            key: _id,
            status,
            startDate: moment(startDate).format("MMMM-YYYY"),
            endDate: moment(endDate).format("MMMM-YYYY"),
            academicSemester: `${academicSemester.name} ${academicSemester?.year}`,
        })
    );
    console.log(tableData);
    const columns: TableColumnsType<TTableDataType> = [
        {
            title: "Academic Semester",
            dataIndex: "academicSemester",
        },
        {
            title: "Start Date",
            dataIndex: "startDate",
            // render: (item) => moment(item.startDate).format("DD-MM-YYYY"),
        },
        {
            title: "End Date",
            dataIndex: "endDate",
            // render: (item) => moment(item.endDate).format("DD-MM-YYYY"),
        },
        {
            title: "Status",
            dataIndex: "status",
            render: (item) => {
                return (
                    <Tag
                        color={
                            item === "UPCOMING"
                                ? "blue"
                                : item === "ONGOING"
                                ? "green"
                                : "red"
                        }>
                        {item}
                    </Tag>
                );
            },
        },
        {
            title: "Action",
            render: (item) => {
                return (
                    <div>
                        <Dropdown
                            menu={menuProps}
                            // trigger={(item) => handleChangeStatus(item)}
                        >
                            <Button onClick={() => setId(item.key)}>
                                <Space>
                                    Update Status
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                    </div>
                );
            },
        },
    ];
    return (
        <div>
            {" "}
            <Table<TTableDataType>
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                showSorterTooltip={{ target: "sorter-icon" }}
            />
        </div>
    );
};

export default RegisteredSemester;

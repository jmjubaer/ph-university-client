import { Button, Table, TableColumnsType } from "antd";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagment.api";
import { TAcademicDepartment } from "../../../types";
type TTableDataType = Pick<TAcademicDepartment, "name" | "academicFaculty">;
const AcademicDepartment = () => {
    const { data: departmentDate, isFetching } =
        useGetAllAcademicDepartmentQuery(undefined);
    const tableData = departmentDate?.data?.map(
        ({ _id, name, academicFaculty }: TAcademicDepartment) => ({
            key: _id,
            name,
            academicFaculty: academicFaculty?.name,
        })
    );
    console.log(departmentDate);
    const columns: TableColumnsType<TTableDataType> = [
        {
            title: "Name",
            dataIndex: "name",
            showSorterTooltip: { target: "full-header" },
        },
        {
            title: "Academic Faculty",
            dataIndex: "academicFaculty",
            showSorterTooltip: { target: "full-header" },
        },
        {
            title: "Action",
            render: () => {
                return (
                    <div>
                        <Button type='primary'>Update</Button>
                        {/* <Button type="primary" danger>
                                Delete
                            </Button> */}
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

export default AcademicDepartment;

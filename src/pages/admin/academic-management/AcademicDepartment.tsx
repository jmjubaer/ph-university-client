import { Button, Table, TableColumnsType } from "antd";
import { useGetAllAcademicDepartmentQuery, useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagment.api";
import { TAcademicDepartment, TAcademicFaculty } from "../../../types";
type TTableDataType = Pick<TAcademicDepartment, "name" | "academicFaculty">;
const AcademicDepartment = () => {
    const { data: facultyData, isLoading: facultyLoading } =
        useGetAllAcademicFacultyQuery(undefined);
    const { data: departmentDate, isFetching } =
        useGetAllAcademicDepartmentQuery(undefined);
    const tableData = departmentDate?.data?.map(
        ({ _id, name, academicFaculty }: TAcademicDepartment) => ({
            key: _id,
            name,
            academicFaculty: facultyData?.data?.find(
                (faculty: TAcademicFaculty) =>
                    faculty._id === academicFaculty?._id
            )?.name,
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
                loading={isFetching || facultyLoading}
                columns={columns}
                dataSource={tableData}
                showSorterTooltip={{ target: "sorter-icon" }}
            />
        </div>
    );
};

export default AcademicDepartment;

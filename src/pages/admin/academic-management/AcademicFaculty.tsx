import { Button, Table, TableColumnsType } from "antd";
import { TAcademicFaculty } from "../../../types/academicFaculty.type";
import { useGetAllAcademicFacultyQuery } from "../../../redux/features/admin/academicManagment.api";
type TTableDataType = Pick<TAcademicFaculty, "name">;
const AcademicFaculty = () => {
    const { data: facultyData, isFetching } =
        useGetAllAcademicFacultyQuery(undefined);
    const tableData = facultyData?.data?.map(
        ({ _id, name }: TAcademicFaculty) => ({
            key: _id,
            name,
        })
    );
    const columns: TableColumnsType<TTableDataType> = [
        {
            title: "Name",
            dataIndex: "name",
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

    // const onChange: TableProps<TTableDataType>["onChange"] = (
    //     _pagination,
    //     filters,
    //     _sorter,
    //     extra
    // ) => {
    //     if (extra.action === "filter") {
    //         const queryParams: TQueryParam[] = [];
    //         filters.name?.forEach((item) =>
    //             queryParams.push({ name: "name", value: item })
    //         );
    //         setParams(queryParams);
    //     }
    // };
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

export default AcademicFaculty;

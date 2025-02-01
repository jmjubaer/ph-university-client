import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useState } from "react";
import { TAcademicSemester, TQueryParam } from "../../../types";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagment.api";
type TTableDataType = Pick<
    TAcademicSemester,
    "name" | "year" | "startMonth" | "endMonth"
>;

const AcademicSemester = () => {
    const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
    const { data: semesterData, isFetching } = useGetAllSemestersQuery(params);
    const tableData = semesterData?.data?.map(
        ({ _id, name, year, startMonth, endMonth }) => ({
            key: _id,
            name,
            year,
            startMonth,
            endMonth,
        })
    );
    const columns: TableColumnsType<TTableDataType> = [
        {
            title: "Name",
            dataIndex: "name",
            showSorterTooltip: { target: "full-header" },
            filters: [
                {
                    text: "Autumn",
                    value: "Autumn",
                },
                {
                    text: "Summer",
                    value: "Summer",
                },
                {
                    text: "Fall",
                    value: "Fall",
                },
            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            // onFilter: (value, record) =>
            //     record.name.indexOf(value as string) === 0,
            // sorter: (a, b) => a.name.length - b.name.length,
            // sortDirections: ["descend"],
        },
        {
            title: "Year",
            dataIndex: "year",
            // defaultSortOrder: "descend",
            // sorter: (a, b) => a.age - b.age,
        },
        {
            title: "Start Month",
            dataIndex: "startMonth",
        },
        {
            title: "end Month",
            dataIndex: "endMonth",
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

    const onChange: TableProps<TTableDataType>["onChange"] = (
        _pagination,
        filters,
        _sorter,
        extra
    ) => {
        if (extra.action === "filter") {
            const queryParams: TQueryParam[] = [];
            filters.name?.forEach((item) =>
                queryParams.push({ name: "name", value: item })
            );
            setParams(queryParams);
        }
    };
    return (
        <div>
            {" "}
            <Table<TTableDataType>
                loading={isFetching}
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
                showSorterTooltip={{ target: "sorter-icon" }}
            />
        </div>
    );
};

export default AcademicSemester;

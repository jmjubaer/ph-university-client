import { Table, TableColumnsType, TableProps } from "antd";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicSemester.api";
interface DataType {
    _id: React.Key;
    name: string;
    year: string;
    startMonth: string;
    endMonth: string;
}

const AcademicSemester = () => {
    const { data: semesterData } = useGetAllSemestersQuery([{ name: "year" , value: '2025'}]);
    console.log(semesterData);
    const tableData = semesterData?.data?.map(
        ({ _id, name, year, startMonth, endMonth }) => ({
            _id,
            name,
            year,
            startMonth,
            endMonth,
        })
    );
    const columns: TableColumnsType<DataType> = [
        {
            title: "Name",
            dataIndex: "name",
            showSorterTooltip: { target: "full-header" },
            filters: [
                {
                    text: "Joe",
                    value: "Joe",
                },
                {
                    text: "Jim",
                    value: "Jim",
                },
                {
                    text: "Submenu",
                    value: "Submenu",
                    children: [
                        {
                            text: "Green",
                            value: "Green",
                        },
                        {
                            text: "Black",
                            value: "Black",
                        },
                    ],
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
    ];

    const onChange: TableProps<DataType>["onChange"] = (
        pagination,
        filters,
        sorter,
        extra
    ) => {
        console.log("params", pagination, filters, sorter, extra);
    };
    return (
        <div>
            {" "}
            <Table<DataType>
                columns={columns}
                dataSource={tableData}
                onChange={onChange}
                showSorterTooltip={{ target: "sorter-icon" }}
            />
        </div>
    );
};

export default AcademicSemester;

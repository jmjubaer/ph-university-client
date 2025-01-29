import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constant/semester";
import { monthsOptions } from "../../../constant/global";
import { academicSemesterSchema } from "../../../Schema/academicSemester.schema.";
import { zodResolver } from "@hookform/resolvers/zod";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
    label: String(currentYear + number),
    value: String(currentYear + number),
}));
const CreateAcademicSemester = () => {
    const handleCreateAcademicSemester: SubmitHandler<FieldValues> = (data) => {
        console.log(data);
        const name = semesterOptions[Number(data.name) - 1]?.label;
        const semesterData = {
            name,
            code: data?.name,
            year: data?.year,
            startMonth: data?.startMonth,
            endMonth: data?.endMonth,
        };
        console.log(semesterData);
    };
    return (
        <Flex justify='center' align='center'>
            <Col span={6}>
                <PHForm
                    onSubmit={handleCreateAcademicSemester}
                    resolver={zodResolver(academicSemesterSchema)}>
                    <PHSelect
                        name='name'
                        label={"Name"}
                        options={semesterOptions}
                    />
                    <PHSelect
                        name='year'
                        label={"Year"}
                        options={yearOptions}
                    />
                    <PHSelect
                        name='startMonth'
                        label={"Start Month"}
                        options={monthsOptions}
                    />
                    <PHSelect
                        name='endMonth'
                        label={"End Month"}
                        options={monthsOptions}
                    />
                    <Button htmlType='submit'>Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default CreateAcademicSemester;

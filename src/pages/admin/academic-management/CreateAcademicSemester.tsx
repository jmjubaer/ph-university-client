/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { semesterOptions } from "../../../constant/semester";
import { monthsOptions } from "../../../constant/global";
import { academicSemesterSchema } from "../../../Schema/academicSemester.schema.";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAddSemesterMutation } from "../../../redux/features/admin/academicSemester.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import { TAcademicSemester } from "../../../types/academicSemester.type";

const currentYear = new Date().getFullYear();
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
    label: String(currentYear + number),
    value: String(currentYear + number),
}));
const CreateAcademicSemester = () => {
    const [createAcademicSemester] = useAddSemesterMutation();
    const handleCreateAcademicSemester: SubmitHandler<FieldValues> = async (
        data
    ) => {
        const tostId = toast.loading("creating ....");
        const name = semesterOptions[Number(data.name) - 1]?.label;
        const semesterData = {
            name,
            code: data?.name,
            year: data?.year,
            startMonth: data?.startMonth,
            endMonth: data?.endMonth,
        };
        try {
            const response = (await createAcademicSemester(
                semesterData
            )) as TResponse<TAcademicSemester>;
            console.log(response.error);
            if (response?.error) {
                toast.error(response?.error?.data?.message, { id: tostId });
            } else {
                toast.success("Academic Semester created successfully", {
                    id: tostId,
                });
            }
        } catch (error: any) {
            toast.error(error.message);
        }
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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHSelect from "../../../components/form/PHSelect";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import { useGetAllSemestersQuery } from "../../../redux/features/admin/academicManagment.api";
import { TAcademicSemester } from "../../../types";
import { statusOptions } from "../../../constant/course";
import PHDatePicker from "../../../components/form/PHDatePicker";
import PHInput from "../../../components/form/PHInput";
import { useAddSemesterRegistrationMutation } from "../../../redux/features/admin/courseMangement.api";

const SemesterRegistration = () => {
    const { data: semesterData } = useGetAllSemestersQuery([
        { name: "sort", value: "year" },
    ]);
    const semesterOptions = semesterData?.data?.map(
        (data: TAcademicSemester) => ({
            key: data._id,
            value: data._id,
            label: ` ${data.name} ${data.year}`,
        })
    );
    const [createSemesterRegistration] = useAddSemesterRegistrationMutation();
    const handleCreateSemesterRegistration: SubmitHandler<FieldValues> = async (
        data
    ) => {
        const tostId = toast.loading("creating ....");
        console.log(data);
        const semesterRegistrationData = {
            ...data,
            minCredit: Number(data.minCredit),
            maxCredit: Number(data.maxCredit),
        };
        try {
            const response = (await createSemesterRegistration(
                semesterRegistrationData
            )) as TResponse<TAcademicSemester>;
            console.log(response);
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
                <PHForm onSubmit={handleCreateSemesterRegistration}>
                    <PHSelect
                        name='academicSemester'
                        label={"Academic Semester"}
                        options={semesterOptions}
                    />{" "}
                    <PHSelect
                        name='status'
                        label={"Status"}
                        options={statusOptions}
                    />{" "}
                    <PHDatePicker name='startDate' label={"Start Date"} />
                    <PHDatePicker name='endDate' label={"End Date"} />
                    <PHInput
                        type='number'
                        name='minCredit'
                        label='Min Credit'
                    />{" "}
                    <PHInput
                        type='number'
                        name='maxCredit'
                        label='Max Credit'
                    />
                    <Button htmlType='submit'>Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default SemesterRegistration;

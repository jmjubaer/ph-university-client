/* eslint-disable @typescript-eslint/no-explicit-any */
import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import PHInput from "../../../components/form/PHInput";
import { toast } from "sonner";
import {
    useAddOfferCourseMutation,
    useGetAllCoursesQuery,
    useGetAllRegisteredSemesterQuery,
    useGETassignCourseFacultiesQuery,
} from "../../../redux/features/admin/courseMangement.api";
import { useState } from "react";
import PHSelectWithWatchValue from "../../../components/form/PHSelectWithWatchValue";
import {
    useGetAllAcademicDepartmentQuery,
    useGetAllAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagment.api";
import PHSelect from "../../../components/form/PHSelect";
import { daysOptions } from "../../../constant/global";
import { TAcademicDepartment, TResponse } from "../../../types";
import PHTimePicker from "../../../components/form/PHTimePicker";

const OfferCourse = () => {
    const [courseId, setCourseId] = useState(undefined);

    const { data: RSemester, isLoading: RSemesterLoading } =
        useGetAllRegisteredSemesterQuery([{ name: "limit", value: 100000 }]);
    const { data: AFaculty, isLoading: AFacultyLoading } =
        useGetAllAcademicFacultyQuery([{ name: "limit", value: 100000 }]);
    const { data: ADepartment, isLoading: ADepartmentLoading } =
        useGetAllAcademicDepartmentQuery([{ name: "limit", value: 100000 }]);
    const { data: courseData, isLoading: courseLoading } =
        useGetAllCoursesQuery([{ name: "limit", value: 100000 }]);
    const { data: faculties, isLoading: facultyLoading } =
        useGETassignCourseFacultiesQuery(courseId, {
            skip: courseId ? false : true,
        });
    const [OfferCourse] = useAddOfferCourseMutation();
    const semesterRegisterOptions = RSemester?.data?.map((semester: any) => {
        return {
            value: semester._id,
            label: `${semester?.academicSemester?.name} - ${semester?.academicSemester?.year}`,
        };
    });
    const aFacultyOptions = AFaculty?.data?.map((faculty: any) => {
        return {
            value: faculty._id,
            label: faculty?.name,
        };
    });
    const aDepartmentOptions = ADepartment?.data?.map((department: any) => {
        return {
            value: department._id,
            label: department?.name,
        };
    });
    const courseOptions = courseData?.data?.map((course: any) => {
        if (courseLoading) {
            return {
                value: null,
                label: "Loading...",
            };
        }
        return {
            value: course._id,
            label: course.title,
        };
    });
    const facultiesOptions = faculties?.data?.faculties?.map((faculty: any) => {
        return {
            value: faculty._id,
            label: faculty.fullName,
        };
    });

    const handleOfferCourse: SubmitHandler<FieldValues> = async (data) => {
        const toastId = toast.loading("Creating ....");
        try {
            const offerCourseData = {
                ...data,
                section: Number(data.section),
                maxCapacity: Number(data.maxCapacity),
            };
            const response = (await OfferCourse(
                offerCourseData
            )) as TResponse<TAcademicDepartment>;
            console.log(response);
            if (response?.error) {
                toast.error(response?.error?.data?.message, { id: toastId });
            } else {
                toast.success("Offer course successfully", {
                    id: toastId,
                });
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    };
    return (
        <Flex justify='center' align='center'>
            <Col span={6}>
                <PHForm onSubmit={handleOfferCourse}>
                    <PHSelect
                        disabled={RSemesterLoading}
                        name='semesterRegistration'
                        options={semesterRegisterOptions}
                        label='Select a registered semester'
                    />
                    <PHSelect
                        disabled={AFacultyLoading}
                        name='academicFaculty'
                        options={aFacultyOptions}
                        label='Select a academic faculty'
                    />
                    <PHSelect
                        disabled={ADepartmentLoading}
                        name='academicDepartment'
                        options={aDepartmentOptions}
                        label='Select a academic department'
                    />
                    <PHSelectWithWatchValue
                        disabled={courseLoading}
                        onValueChange={setCourseId}
                        name='course'
                        options={courseOptions}
                        label='Select a course'
                    />

                    <PHSelect
                        disabled={!courseId || facultyLoading}
                        name='faculty'
                        options={facultiesOptions}
                        label='Select a faculty'
                    />
                    <PHInput
                        name='maxCapacity'
                        type='number'
                        label='Max Capacity'
                    />
                    <PHInput name='section' type='number' label='Section' />
                    <PHSelect
                        name='days'
                        mode='multiple'
                        options={daysOptions}
                        label='Select day'
                    />

                    <PHTimePicker name='startTime' label='Start Time' />
                    <PHTimePicker name='endTime' label='End Time' />
                    <Button htmlType='submit'>Submit</Button>
                </PHForm>
            </Col>
        </Flex>
    );
};

export default OfferCourse;

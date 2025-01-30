import { z } from "zod";

export const academicSemesterSchema = z.object({
    name: z.string({ required_error: "Please select a name" }),
    year: z.string({ required_error: "Please select a year" }),
    startMonth: z.string({ required_error: "Please select a start month" }),
    endMonth: z.string({ required_error: "Please select a end month" }),
});
export const academicFacultySchema = z.object({
    name: z.string({ required_error: "Please enter  name" }),
});
export const academicDepartmentSchema = z.object({
    name: z.string({ required_error: "Please enter name" }),
    academicFaculty: z.string({ required_error: "Please select faculty" }),
});

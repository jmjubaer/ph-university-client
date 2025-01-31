import { TQueryParam, TResponseRedux } from "../../../types";
import { TAcademicSemester } from "../../../types/academicSemester.type";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemesters: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: "/academic-semester",
                    method: "GET",
                    params,
                };
            },
            transformResponse: (
                response: TResponseRedux<TAcademicSemester[]>
            ) => ({
                data: response.data,
                meta: response.meta,
            }),
        }),
        getSemesterById: builder.query({
            query: (id) => ({
                url: `/academicSemester/${id}`,
                method: "GET",
            }),
        }),
        addSemester: builder.mutation({
            query: (semester) => ({
                url: "/academic-semester/create-academic-semester",
                method: "POST",
                body: semester,
            }),
        }),
        updateSemester: builder.mutation({
            query: (semester) => ({
                url: `/academicSemester/${semester.id}`,
                method: "PUT",
                body: semester,
            }),
        }),
        getAllAcademicFaculty: builder.query({
            query: () => ({
                url: "/academic-faculties",
                method: "GET",
            }),
        }),
        addAcademicFaculty: builder.mutation({
            query: (faculty) => ({
                url: "/academic-faculties/create-academic-faculty",
                method: "POST",
                body: faculty,
            }),
        }),
        getAllAcademicDepartment: builder.query({
            query: () => ({
                url: "/academic-departments",
                method: "GET",
            }),
        }),
        addAcademicDepartment: builder.mutation({
            query: (department) => ({
                url: "/academic-departments/create-academic-department",
                method: "POST",
                body: department,
            }),
        }),
    }),
});

export const {
    useGetAllSemestersQuery,
    useGetSemesterByIdQuery,
    useAddSemesterMutation,
    useGetAllAcademicFacultyQuery,
    useAddAcademicFacultyMutation,
    useGetAllAcademicDepartmentQuery,
    useAddAcademicDepartmentMutation,
} = academicManagementApi;

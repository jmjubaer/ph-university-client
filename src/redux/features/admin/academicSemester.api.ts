import { TResponseRedux } from "../../../types";
import { TAcademicSemester } from "../../../types/academicSemester.type";
import { baseApi } from "../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemesters: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                params.append(args[0].name, args[0].value);
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
    }),
});

export const {
    useGetAllSemestersQuery,
    useGetSemesterByIdQuery,
    useAddSemesterMutation,
} = academicSemesterApi;

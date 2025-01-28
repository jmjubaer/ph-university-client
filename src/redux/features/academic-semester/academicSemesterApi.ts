import { baseApi } from "../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemesters: builder.query({
            query: () => ({
                url: "/academic-semester",
                method: "GET",
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
                url: "/academicSemester",
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

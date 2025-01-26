import { baseApi } from "../../api/baseApi";

const academicSemesterApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSemesters: builder.query({
            query: () => ({
                url: "/academicSemesters",
                method: "GET",
            }),
        }),
        getSemesterById: builder.query({
            query: (id) => ({
                url: `/academicSemesters/${id}`,
                method: "GET",
            }),
        }),
        addSemester: builder.mutation({
            query: (semester) => ({
                url: "/academicSemesters",
                method: "POST",
                body: semester,
            }),
        }),
        updateSemester: builder.mutation({
            query: (semester) => ({
                url: `/academicSemesters/${semester.id}`,
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

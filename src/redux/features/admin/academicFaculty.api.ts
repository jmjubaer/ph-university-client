import { baseApi } from "../../api/baseApi";

const academicFacultyApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
    }),
});

export const { useGetAllAcademicFacultyQuery, useAddAcademicFacultyMutation } =
    academicFacultyApi;

import { baseApi } from "../../api/baseApi";

const academicDepartmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
    useGetAllAcademicDepartmentQuery,
    useAddAcademicDepartmentMutation,
} = academicDepartmentApi;

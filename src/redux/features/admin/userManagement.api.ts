import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudent: builder.query({
            query: () => ({
                url: "/students",
                method: "GET",
            }),
        }),
        addStudent: builder.mutation({
            query: (user) => ({
                url: "/users/create-student",
                method: "POST",
                body: user,
            }),
        }),
    }),
});
export const { useGetAllStudentQuery, useAddStudentMutation } =
    userManagementApi;

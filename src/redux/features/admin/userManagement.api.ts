import { TResponseRedux, TStudent } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudent: builder.query({
            query: () => ({
                url: "/students",
                method: "GET",
            }),
            transformResponse: (response: TResponseRedux<TStudent[]>) => ({
                data: response.data,
                meta: response.meta,
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

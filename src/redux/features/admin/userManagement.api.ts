import {
    TAdmin,
    TFaculty,
    TQueryParam,
    TResponseRedux,
    TStudent,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllStudent: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/students",
                    method: "GET",
                    params,
                };
            },
            transformResponse: (response: TResponseRedux<TStudent[]>) => ({
                data: response.data,
                meta: response.meta,
            }),
        }),
        getStudentById: builder.query({
            query: (id) => ({
                url: `/students/${id}`,
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
        updateUserStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/users/change-status/${id}`,
                method: "POST",
                body: status,
            }),
        }),
        getAllFaculty: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/faculties",
                    method: "GET",
                    params,
                };
            },
            transformResponse: (response: TResponseRedux<TFaculty[]>) => ({
                data: response.data,
                meta: response.meta,
            }),
        }),
        getFacultyById: builder.query({
            query: (id) => ({
                url: `/faculties/${id}`,
                method: "GET",
            }),
        }),
        addFaculty: builder.mutation({
            query: (user) => ({
                url: "/users/create-faculty",
                method: "POST",
                body: user,
            }),
        }),

        getAllAdmin: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/admins",
                    method: "GET",
                    params,
                };
            },
            transformResponse: (response: TResponseRedux<TAdmin[]>) => ({
                data: response.data,
                meta: response.meta,
            }),
        }),
        getAdminById: builder.query({
            query: (id) => ({
                url: `/admins/${id}`,
                method: "GET",
            }),
        }),
        addAdmin: builder.mutation({
            query: (user) => ({
                url: "users/create-admin",
                method: "POST",
                body: user,
            }),
        }),
    }),
});
export const {
    useGetAllStudentQuery,
    useAddStudentMutation,
    useGetStudentByIdQuery,
    useUpdateUserStatusMutation,
    useGetAllFacultyQuery,
    useGetFacultyByIdQuery,
    useAddFacultyMutation,
    useGetAllAdminQuery,
    useGetAdminByIdQuery,
    useAddAdminMutation,
} = userManagementApi;

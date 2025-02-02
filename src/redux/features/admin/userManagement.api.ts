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
            providesTags: ["student"],
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
            invalidatesTags: ["student"]
        }),
        updateUserStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/users/change-status/${id}`,
                method: "POST",
                body: status,
                invalidatesTags: ["student"]
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
            providesTags: ["faculty"],
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
            invalidatesTags: ["faculty"]
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
            providesTags: ["admin"],
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
            invalidatesTags: ["admin"]
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

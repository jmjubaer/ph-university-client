import { TQueryParam, TResponseRedux, TStudent } from "../../../types";
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

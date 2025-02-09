/* eslint-disable @typescript-eslint/no-explicit-any */
import { TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const userManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getMyOfferCourse: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/offered-courses/my-offered-courses",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["offered-course"],
            transformResponse: (response: TResponseRedux<any>) => ({
                data: response.data,
                meta: response.meta,
            }),
        }),
        getMyEnrolledCourse: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/enrolled-courses/my-enrolled-course",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["offered-course"],
            transformResponse: (response: TResponseRedux<any>) => ({
                data: response.data,
                meta: response.meta,
            }),
        }),
        enrollCourse: builder.mutation({
            query: (data) => ({
                url: "/enrolled-courses/create-enrolled-course",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["offered-course"],
        }),
    }),
});
export const { useGetMyOfferCourseQuery, useEnrollCourseMutation,useGetMyEnrolledCourseQuery } =
    userManagementApi;

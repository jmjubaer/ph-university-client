import { TQueryParam, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const facultyCourseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getFacultyCourse: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }

                return {
                    url: "/enrolled-courses/my-course",
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
    // Add other CRUD operations as needed for faculty course management (e.g., create, read, update, delete)
});

export const { useGetFacultyCourseQuery, useEnrollCourseMutation } =
    facultyCourseManagementApi;

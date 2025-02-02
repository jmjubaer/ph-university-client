import { TQueryParam } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllRegisteredSemester: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: "/semester-registration",
                    method: "GET",
                    params,
                };
            },

            providesTags: ["semester-registration"],
        }),
        addSemesterRegistration: builder.mutation({
            query: (semester) => ({
                url: "/semester-registration/create-semester-registration",
                method: "POST",
                body: semester,
            }),
            invalidatesTags: ["semester-registration"],
        }),
        changeRegisteredSemesterStatus: builder.mutation({
            query: ({ id, data }) => ({
                url: `/semester-registration/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["semester-registration"],
        }),
        getAllCourses: builder.query({
            query: (args) => {
                const params = new URLSearchParams();
                if (args) {
                    args.forEach((item: TQueryParam) => {
                        params.append(item.name, item.value as string);
                    });
                }
                return {
                    url: "/courses",
                    method: "GET",
                    params,
                };
            },
            providesTags: ["course"],
        }),
        addCourse: builder.mutation({
            query: (course) => ({
                url: "/courses/create-course",
                method: "POST",
                body: course,
            }),
            invalidatesTags: ["course"],
        }),
    }),
});

export const {
    useGetAllRegisteredSemesterQuery,
    useAddSemesterRegistrationMutation,
    useChangeRegisteredSemesterStatusMutation,
    useGetAllCoursesQuery,
    useAddCourseMutation,
} = courseManagementApi;

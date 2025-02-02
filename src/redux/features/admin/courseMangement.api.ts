import { TQueryParam } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
        }),
    }),
});

export const { useGetAllCoursesQuery } = courseManagementApi;

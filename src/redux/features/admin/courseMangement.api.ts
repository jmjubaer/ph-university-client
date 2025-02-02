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
        }),
        addSemesterRegistration: builder.mutation({
            query: (semester) => ({
                url: "/semester-registration/create-semester-registration",
                method: "POST",
                body: semester,
            }),
        }),
    }),
});

export const {
    useGetAllRegisteredSemesterQuery,
    useAddSemesterRegistrationMutation,
} = courseManagementApi;

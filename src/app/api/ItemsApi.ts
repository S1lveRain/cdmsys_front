import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const itemsAPI = createApi({
    reducerPath: "itemsAPI",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000"}),
    tagTypes: ["Item"],
    endpoints: (build) => ({
        getGroups: build.query({
            query: () => ({
                url: 'group/',
            }),
            providesTags: (result) => ["Item"],
        }),
    }),
});

export const { useGetGroupsQuery } = itemsAPI;
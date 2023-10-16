import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const modelsApi = createApi({
    reducerPath: "modelsAPI",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000"}),
    tagTypes: ["Model"],
    endpoints: (build) => ({
        getModels: build.query({
            query: () => ({
                url: '/dev/models',
            }),
            providesTags: (result) => ["Model"],
        }),
    }),
});

export const { useGetModelsQuery } = modelsApi;
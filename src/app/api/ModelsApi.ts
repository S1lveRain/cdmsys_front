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
        getModel: build.query({
            query: (modelName) => ({
                url: `${modelName}`
            }),
            providesTags: (result) => ["Model"],
        }),
        getDevModel: build.query({
            query: (modelName) => ({
                url: `/dev/models/${modelName}/`
            }),
            providesTags: (result) => ["Model"],
        }),
        deleteModelObject: build.mutation({
            query: ({modelName, id}) => ({
                url: `/${modelName}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Model"],
        }),
        addModelObject: build.mutation({
            query: ({ modelName, body }) => ({
                url: `/${modelName}/`,
                method: "POST",
                body: body,
            }),

            invalidatesTags: ["Model"],
        }),
    }),
});

export const { useGetModelsQuery, useGetModelQuery, useGetDevModelQuery, useDeleteModelObjectMutation, useAddModelObjectMutation } = modelsApi;
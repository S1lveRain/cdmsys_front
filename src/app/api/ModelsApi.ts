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
            providesTags: ['Model', {type: 'Model', id: 'LIST'}],
        }),
        getModel: build.query({
            query: (modelName) => ({
                url: `${modelName}`
            }),
            providesTags: ['Model', {type: 'Model', id: 'LIST'}],
        }),
        getDevModel: build.query({
            query: (modelName) => ({
                url: `/dev/models/${modelName}/`
            }),
            providesTags: ['Model', {type: 'Model', id: 'LIST'}],
        }),
        getOneModelObject: build.query({
            query: ({modelName, id}) => ({
                url: `/${modelName}/${id}`
            }),
        }),
        deleteModelObject: build.mutation({
            query: ({modelName, id}) => ({
                url: `/${modelName}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{type: 'Model', id: 'LIST'}],
        }),
        addModelObject: build.mutation({
            query: ({ modelName, body }) => ({
                url: `/${modelName}/`,
                method: "POST",
                body: body,
            }),

            invalidatesTags: ["Model"],
        }),
        updateModelObject: build.mutation({
            query: ({modelName, body, id}) => ({
                url: `/${modelName}/${id}`,
                method: "PUT",
                body: body
            }),
            invalidatesTags: ["Model"]
        }),
    }),
});

export const { useGetModelsQuery, useGetModelQuery, useGetDevModelQuery, useGetOneModelObjectQuery, useDeleteModelObjectMutation, useAddModelObjectMutation, useUpdateModelObjectMutation } = modelsApi;
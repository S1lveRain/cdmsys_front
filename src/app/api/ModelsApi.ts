import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";

export const modelsApi = createApi({
    reducerPath: "modelsAPI",
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000"}),
    tagTypes: ["Models", "Model", "Objects", "Object"],
    endpoints: (build) => ({
        getModels: build.query({
            query: () => ({
                url: '/dev/models',
            }),
            providesTags: ['Models', {type: 'Models', id: 'LIST'}],
        }),
        getModel: build.query({
            query: (modelName) => ({
                url: `${modelName}`
            }),
            providesTags: ['Objects', {type: 'Objects', id: 'LIST'}],
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
            providesTags: ['Object', {type: 'Object', id: 'LIST'}]
        }),
        deleteModelObject: build.mutation({
            query: ({modelName, id}) => ({
                url: `/${modelName}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{type: 'Objects', id: 'LIST'}, {type: 'Models', id: 'LIST'}],
        }),
        addModelObject: build.mutation({
            query: ({modelName, body}) => ({
                url: `/${modelName}/`,
                method: "POST",
                body: body,
            }),

            invalidatesTags: [{type: 'Objects', id: 'LIST'}],
        }),
        updateModelObject: build.mutation({
            query: ({modelName, body, id}) => ({
                url: `/${modelName}/${id}`,
                method: "PUT",
                body: body
            }),
            invalidatesTags: [{type: 'Object', id: 'LIST'}]
        }),
    }),
});

export const {
    useGetModelsQuery,
    useGetModelQuery,
    useGetDevModelQuery,
    useGetOneModelObjectQuery,
    useDeleteModelObjectMutation,
    useAddModelObjectMutation,
    useUpdateModelObjectMutation
} = modelsApi;
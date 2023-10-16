import {createBrowserRouter} from "react-router-dom";
import { Home } from "../pages/Home/Home";
import Layout from "../pages/Layout";
import {ModelEdit} from "../pages/ModelEdit/ModelEdit";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/model/:modelName',
                element: <ModelEdit />
            }
        ]
    },
])

import { createRoot, } from "react-dom/client";
import * as React from "react";
import {
    createHashRouter, Outlet,
    RouterProvider,
} from 'react-router-dom';
import {makeRequest, sendRequest} from '../../lib/requests';

sendRequest(makeRequest(null, "init-worker"))


const Home = () => {
    return <div>
        <div>
            <h1 className="text-xl font-medium">BG Kitchen - Orders</h1>
        </div>
        <div className="notices" />
    </div>;
}

const router = createHashRouter([
    {
        element: <div className="flex justify-center pt-10"><div><Outlet /></div></div>,
        children:[
            {
                path: "/",
                element: <Home />,
            },
        ],
    },

]);


const container = document.getElementById("root");

const root = createRoot(container)
root.render(<RouterProvider router={router} />);



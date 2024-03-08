import { Navigate, useRoutes } from 'react-router-dom';
import {
    Estimations,
    Trash,
    Elementor,
    SignUp,
    Login,
    DashboardLayout,
} from '../pages';

const Routes = () => {
    return useRoutes([
        {
            path: "/", element: <DashboardLayout />,
            children: [

                { path: "/", element: <Estimations /> },
                { path: "/trash", element: <Trash /> },
            ]
        },
        { path: "/tool", element: <Elementor /> },
        { path: "404", element: <div>Not Found</div> },
        { path: "/sign-up", element: <SignUp /> },
        { path: "/login", element: <Login /> },
        {
            path: "*",
            element: <Navigate to="/404" />,
        },
    ])

}

export default Routes
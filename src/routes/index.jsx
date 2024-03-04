import { Navigate, useRoutes } from 'react-router-dom';
import {
    Estimations,
    Trash,
    Elementor,
    SignUp,
    Login,
} from '../pages';

const Routes = () => {
    return useRoutes([
        { path: "/dashboard/estimations", element: <Estimations /> },
        { path: "/dashboard/trash", element: <Trash /> },
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
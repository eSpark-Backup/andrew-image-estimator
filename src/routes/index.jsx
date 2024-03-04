import { Navigate, useRoutes } from 'react-router-dom';
import {
    Dashboard,
    Elementor,
    SignUp
} from '../pages';

const Routes = () => {
    return useRoutes([
        { path: "/", element: <Dashboard /> },
        { path: "/tool", element: <Elementor /> },
        { path: "404", element: <div>Not Found</div> },
        { path: "/sign-up", element: <SignUp /> },
        {
            path: "*",
            element: <Navigate to="/404" />,
        },
    ])

}

export default Routes
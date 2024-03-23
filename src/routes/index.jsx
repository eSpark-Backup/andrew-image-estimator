import { Navigate, useRoutes } from 'react-router-dom';
import {
    Estimations,
    Trash,
    FieldCustomizer,
    Elementor,
    SignUp,
    Login,
    DashboardLayout,
} from '../pages';

const Routes = () => {
    const user = JSON.parse(localStorage.getItem("user")) || null;

    const PrivateRoute = ({ element, roles }) => {
        const userRole = user.role; 
        if (!roles.includes(userRole)) {
          return <Navigate to="/" />;
        }
        return element;
      };

    return useRoutes([
        {
            path: "/", element: <DashboardLayout />,
            children: [

                { path: "/", element: <Estimations /> },
                { path: "/trash", element: <Trash /> },
                { path: "/change-fields", element: <FieldCustomizer /> },
            ]
        },
        {
            path: '/admin',
            element: <PrivateRoute element={<DashboardLayout />} roles={['admin']}/>,
            children: [
              { path: '/admin', element: <FieldCustomizer /> },
            ],
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
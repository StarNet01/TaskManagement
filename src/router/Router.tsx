import Login from "pages/Auth/Login";
import Register from "pages/Auth/Register";
import Panel from "pages/Panel/Index";
import ResetPassword from "pages/Auth/ResetPassword";
import React from "react";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import { userState } from "store/user/UserSlice";
import { useSelector } from "react-redux";

interface RouteItem {
  path: string;
  component: JSX.Element;
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let isAuthenticated: boolean = !!useSelector(userState).token;
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

const RenderRoutes: React.FC = (): JSX.Element => {
  const routes: RouteItem[] = [
    {
      path: "/",
      component: <Login />,
    },
    {
      path: "/login",
      component: <Login />,
    },
    {
      path: "/register",
      component: <Register />,
    },
    {
      path: "/resetPassword",
      component: <ResetPassword />,
    },
    {
      path: "/panel",
      component: (
        <RequireAuth>
          <Panel />
        </RequireAuth>
      ),
    },
  ];

  return (
    <Routes>
      {routes.map((route: RouteItem, i) => (
        <Route key={i} path={route.path} element={route.component} />
      ))}
    </Routes>
  );
};
export default RenderRoutes;

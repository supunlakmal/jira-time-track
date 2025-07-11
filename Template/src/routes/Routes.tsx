import React from "react";
import { Navigate, Route, RouteObject, RouteProps, Routes } from "react-router-dom";

// redux
import { RootState } from "../redux/store";
import { useSelector } from "react-redux";

// All layouts containers
import DefaultLayout from "../layouts/Default";
import VerticalLayout from "../layouts/Vertical";

import { authProtectedFlattenRoutes, publicProtectedFlattenRoutes } from ".";
import { APICore } from "../helpers/api/apiCore";

const AllRoutes = (props: RouteProps) => {
  const { Layout } = useSelector((state: RootState) => ({
    Layout: state.Layout,
  }));

  const api = new APICore();

  return (
    <React.Fragment>
      <Routes>
        <Route>
          {(publicProtectedFlattenRoutes || []).map((route: RouteObject, idx: number) => (
            <Route
              path={route.path}
              element={
                <DefaultLayout {...props} layout={Layout}>
                  {route.element}
                </DefaultLayout>
              }
              key={idx}
            />
          ))}
          ;
        </Route>

        <Route>
          {(authProtectedFlattenRoutes || []).map((route: RouteObject, idx: number) => (
            <Route
              path={route.path}
              element={
                api.isUserAuthenticated() === false ? (
                  <Navigate
                    to={{
                      pathname: "/auth/login",
                      search: "next=" + route.path,
                    }}
                  />
                ) : (
                  <VerticalLayout {...props}>{route.element}</VerticalLayout>
                )
              }
              key={idx}
            />
          ))}
          ;
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default AllRoutes;

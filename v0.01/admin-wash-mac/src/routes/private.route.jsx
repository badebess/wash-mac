import React from "react";
import { authService } from "../configs/auth";
import { Outlet } from "react-router-dom";
import { Unauthorized } from "../pages/Unauthorized";
import { Layout } from "../components/layout";

export function PrivateRoute() {
  if (authService.isAuthorized())
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  return <Unauthorized />;
}

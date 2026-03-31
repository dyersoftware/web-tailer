import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/auth.layout";
import DashboardLayout from "../layouts/dashboard.layout";
import authRoutes from "../../modules/routes/auth.routes";
import dashboardRoutes from "../../modules/dashboard/routes/dashboard.routes";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AuthLayout />}>
        {authRoutes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Route>
      <Route path="/dashboard" element={<DashboardLayout />}>
        {dashboardRoutes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Route>
    </Routes>
  );
}

export default MainRoutes;

import { Routes, Route } from "react-router-dom";
import AuthLayout from "../layouts/auth.layout";
import DashboardLayout from "../layouts/dashboard.layout";
import ProtectedLayout from "../layouts/protected.layout";
import authRoutes from "../../modules/auth/routes/auth.routes";
import dashboardRoutes from "../../modules/dashboard/routes/dashboard.routes";
import tmsRoutes from "../../modules/tailor-management-system/routes/tms.routes";

function MainRoutes() {
  return (
    <Routes>
      {/* Auth routes */}
      <Route path="/" element={<AuthLayout />}>
        {authRoutes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
      </Route>

      {/* Protected routes */}
      <Route path="/" element={<ProtectedLayout />}>
        <Route path="dashboard" element={<DashboardLayout />}>
          {dashboardRoutes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
        </Route>
        <Route path="tms" element={<DashboardLayout />}>
          {tmsRoutes.map((route, i) => (
            <Route key={i} {...route} />
          ))}
        </Route>
      </Route>
    </Routes>
  );
}

export default MainRoutes;

import LoginScreen from "../auth/screens/login.screen";
import RegisterScreen from "../auth/screens/register.screen";

const authRoutes = [
  { index: true, element: <LoginScreen /> },
  { path: "register", element: <RegisterScreen /> },
];

export default authRoutes;

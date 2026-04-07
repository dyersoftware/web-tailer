import LoginScreen from "../screens/login.screen";
import RegisterScreen from "../screens/register.screen";

const authRoutes = [
  { index: true, element: <LoginScreen /> },
  { path: "register", element: <RegisterScreen /> },
];

export default authRoutes;

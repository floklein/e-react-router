import { router } from "./router";
import { useAuth } from "./zustand/auth";
import { RouterProvider } from "react-router-dom";

export default function App() {
  const user = useAuth((state) => state.user);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  return <RouterProvider router={router} />;
}

import { RouterProvider } from "@tanstack/react-router";
import { router } from "./router";
import { Suspense } from "react";
import { TanStackRouterDevtools } from "./router/TanStackRouterDevtools";
import { useAuth } from "./zustand/auth";

export default function App() {
  const user = useAuth((state) => state.user);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  return (
    <>
      <RouterProvider
        router={router}
        context={{ auth: { user, isAuthenticated } }}
      />
      <Suspense>
        <TanStackRouterDevtools router={router} />
      </Suspense>
    </>
  );
}

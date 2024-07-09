import { Auth } from "../zustand/auth";
import { createRootRouteWithContext } from "@tanstack/react-router";
import Root from "../components/Root";
import Error from "../components/Error";

interface RouterContext {
  auth: Pick<Auth, "user" | "isAuthenticated">;
}

export const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: Root,
  errorComponent: Error,
});

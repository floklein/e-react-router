import {
  createRoute,
  defer,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router";
import { fetchCarts, fetchUsers } from "../api";
import { z } from "zod";
import { rootRoute } from "./rootRoute";

export const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "login",
  beforeLoad: async ({ context, search }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({
        to: search.redirect ?? "/",
      });
    }
  },
  validateSearch: z.object({
    redirect: z.string().optional(),
  }),
  loader: async () => {
    const cartsPromise = fetchCarts();
    const users = await fetchUsers();
    return { users, deferredCarts: defer(cartsPromise) };
  },
  component: lazyRouteComponent(() => import("../components/Login")),
});

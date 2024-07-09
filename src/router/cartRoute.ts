import {
  createRoute,
  lazyRouteComponent,
  redirect,
} from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import { fetchUserCarts } from "../api";

export const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "cart",
  beforeLoad: async ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: "/cart",
        },
      });
    }
  },
  loader: ({ context }) => fetchUserCarts(context.auth.user!.id),
  component: lazyRouteComponent(() => import("../components/Cart")),
});

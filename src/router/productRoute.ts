import { createRoute, lazyRouteComponent } from "@tanstack/react-router";
import { fetchProduct } from "../api";
import { rootRoute } from "./rootRoute";

export const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "product/$productId",
  loader: async ({ params }) => fetchProduct(params.productId),
  component: lazyRouteComponent(() => import("../components/Product")),
});

import { createRouter } from "@tanstack/react-router";
import { productRoute } from "./productRoute";
import { productsRoute } from "./productsRoute";
import { cartRoute } from "./cartRoute";
import { loginRoute } from "./loginRoute";
import { rootRoute } from "./rootRoute";

const routeTree = rootRoute.addChildren([
  loginRoute,
  cartRoute,
  productsRoute,
  productRoute,
]);

export const router = createRouter({
  routeTree,
  context: {
    auth: {
      user: null,
      isAuthenticated: false,
    },
  },
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

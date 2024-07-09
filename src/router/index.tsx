import {
  createBrowserRouter,
  createSearchParams,
  defer,
  redirect,
} from "react-router-dom";
import Root from "../components/Root";
import Error from "../components/Error";
import {
  fetchCarts,
  fetchProduct,
  fetchProducts,
  fetchUserCarts,
  fetchUsers,
  searchProducts,
} from "../api";
import { useAuth } from "../zustand/auth";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        loader: ({ request }) => {
          const search = new URL(request.url).searchParams.get("search");
          return search !== null ? searchProducts(search) : fetchProducts();
        },
        lazy: async () => ({
          Component: (await import("../components/Products")).default,
        }),
      },
      {
        path: "product/:productId",
        loader: ({ params }) => fetchProduct(params.productId),
        lazy: async () => ({
          Component: (await import("../components/Product")).default,
        }),
      },
      {
        path: "login",
        loader: async ({ request }) => {
          const { isAuthenticated } = useAuth.getState();
          if (isAuthenticated) {
            throw redirect(
              new URL(request.url).searchParams.get("redirect") ?? "/",
            );
          }
          const users = fetchUsers();
          const carts = fetchCarts();
          return defer({
            users,
            carts,
          });
        },
        lazy: async () => ({
          Component: (await import("../components/Login")).default,
        }),
      },
      {
        path: "cart",
        loader: () => {
          const { isAuthenticated, user } = useAuth.getState();
          if (!isAuthenticated) {
            const searchParams = createSearchParams({ redirect: "/cart" });
            throw redirect(`/login?${searchParams.toString()}`);
          }
          return fetchUserCarts(user!.id);
        },
        lazy: async () => ({
          Component: (await import("../components/Cart")).default,
        }),
      },
    ],
  },
]);

if (import.meta.hot) {
  import.meta.hot.dispose(() => router.dispose());
}

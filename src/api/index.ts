import {
  cartsSchema,
  loginSchema,
  productSchema,
  productsSchema,
  usersSchema,
} from "../zod";

export async function fetchProducts() {
  const { products } = productsSchema.parse(
    await (await fetch("https://dummyjson.com/products?limit=0")).json(),
  );
  return products;
}

export async function searchProducts(search: string) {
  const { products } = productsSchema.parse(
    await (
      await fetch(`https://dummyjson.com/products/search?q=${search}`)
    ).json(),
  );
  return products;
}

export async function fetchProduct(productId: string) {
  return productSchema.parse(
    await (await fetch(`https://dummyjson.com/products/${productId}`)).json(),
  );
}

export async function fetchUsers() {
  const { users } = usersSchema.parse(
    await (await fetch("https://dummyjson.com/users?limit=0")).json(),
  );
  return users;
}

export async function loginUser(username: string, password: string) {
  return loginSchema.parse(
    await (
      await fetch("https://dummyjson.com/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })
    ).json(),
  );
}

export async function fetchCarts() {
  const { carts } = cartsSchema.parse(
    await (await fetch("https://dummyjson.com/carts?limit=0")).json(),
  );
  return carts;
}

export async function fetchUserCarts(userId: number) {
  const { carts } = cartsSchema.parse(
    await (await fetch(`https://dummyjson.com/carts/user/${userId}`)).json(),
  );
  return carts;
}

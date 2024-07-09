import { Await, getRouteApi, useRouter } from "@tanstack/react-router";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Typography,
} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { loginUser } from "../api";
import { useAuth } from "../zustand/auth";
import { Suspense } from "react";

const loginRoute = getRouteApi("/login");

export default function Login() {
  const router = useRouter();

  const navigate = loginRoute.useNavigate();
  const redirect = loginRoute.useSearch({ select: (s) => s.redirect });
  const { users, deferredCarts } = loginRoute.useLoaderData();

  const login = useAuth((state) => state.login);

  const handleLogin = (username: string, password: string) => async () => {
    login(await loginUser(username, password));
    await router.invalidate();
    await navigate({ to: redirect ?? "/" });
  };

  return (
    <Container>
      <Grid2 container spacing={1}>
        {users.map((user) => (
          <Grid2 key={user.id} xs={6} sm={4} md={3}>
            <Card elevation={0}>
              <CardMedia
                component="img"
                image={user.image}
                alt={user.username}
                loading="lazy"
              />
              <CardContent>
                <Typography variant="h5">{user.username}</Typography>
                <Typography variant="body2" noWrap color="textSecondary">
                  <Suspense fallback="...">
                    <Await promise={deferredCarts}>
                      {(carts) =>
                        `${carts.filter((c) => c.userId === user.id).length ?? "No"} carts`
                      }
                    </Await>
                  </Suspense>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={handleLogin(user.username, user.password)}
                >
                  Login
                </Button>
              </CardActions>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Container>
  );
}

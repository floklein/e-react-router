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
import { Await, useLoaderData, useRevalidator } from "react-router-dom";

export default function Login() {
  const revalidator = useRevalidator();
  const { users, carts } = useLoaderData();

  const login = useAuth((state) => state.login);

  const handleLogin = (username: string, password: string) => async () => {
    login(await loginUser(username, password));
    revalidator.revalidate();
  };

  return (
    <Container>
      <Grid2 container spacing={1}>
        <Suspense fallback="Loading...">
          <Await resolve={users}>
            {(awaitedUsers) =>
              awaitedUsers.map((user) => (
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
                        <Await resolve={carts}>
                          {(awaitedCarts) =>
                            `${
                              awaitedCarts.filter((c) => c.userId === user.id)
                                .length ?? "No"
                            } carts`
                          }
                        </Await>
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
              ))
            }
          </Await>
        </Suspense>
      </Grid2>
    </Container>
  );
}

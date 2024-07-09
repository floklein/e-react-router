import {
  AppBar,
  IconButton,
  LinearProgress,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import User from "./User";
import {
  Link,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from "react-router-dom";

export default function Root() {
  const loading = useNavigation().state === "loading";

  return (
    <>
      <ScrollRestoration getKey={(location) => location.pathname} />
      <AppBar position="sticky">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography variant="h6" color="inherit" component={Link} to="/">
            App
          </Typography>
          <Stack direction="row" spacing={2}>
            <IconButton color="inherit" component={Link} to="/cart">
              <ShoppingCart />
            </IconButton>
            <User />
          </Stack>
        </Toolbar>
      </AppBar>
      {loading && (
        <LinearProgress
          sx={{
            position: "fixed",
            width: 1,
          }}
        />
      )}
      <Outlet />
    </>
  );
}

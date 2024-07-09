import {
  Avatar,
  IconButton,
  IconButtonProps,
  Menu,
  MenuItem,
} from "@mui/material";
import { Login } from "@mui/icons-material";
import { useAuth } from "../zustand/auth";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";

export default function User() {
  const router = useRouter();
  const navigate = useNavigate();

  const isAuthenticated = useAuth((state) => state.isAuthenticated);
  const firstName = useAuth((state) => state.user?.firstName);
  const lastName = useAuth((state) => state.user?.lastName);
  const image = useAuth((state) => state.user?.image);
  const logout = useAuth((state) => state.logout);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openMenu: IconButtonProps["onClick"] = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    closeMenu();
    logout();
    await router.invalidate();
    await navigate({ to: "/" });
  };

  return isAuthenticated ? (
    <>
      <IconButton sx={{ p: 0 }} onClick={openMenu}>
        <Avatar src={image} />
      </IconButton>
      <Menu
        open={anchorEl !== null}
        anchorEl={anchorEl}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem disabled>
          {firstName} {lastName}
        </MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  ) : (
    <IconButton color="inherit" component={Link} to="/login">
      <Login />
    </IconButton>
  );
}

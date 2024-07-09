import { createTheme } from "@mui/material/styles";
import type {} from "@mui/lab/themeAugmentation";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      paper: "#222222",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          wordBreak: "break-word",
          "a&": {
            textDecoration: "none",
          },
          "pre&": {
            whiteSpace: "pre-wrap",
          },
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: ({ theme }) => ({
          marginBottom: theme.spacing(1),
        }),
        gutters: {
          marginBottom: 0,
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: ({ theme }) => ({
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
        }),
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.default,
        }),
      },
    },
  },
});

export default theme;

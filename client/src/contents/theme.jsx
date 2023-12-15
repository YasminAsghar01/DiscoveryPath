import React, { useMemo } from "react";
import { node } from "prop-types";
import { createTheme, ThemeProvider } from "@mui/material";

// This sets a default theme that is applied throughout the app
const DefaultThemeProvider = ({ children }) => {
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          // Shades of blue
          primary: {
            main: "#005EB8",
            light: "#0091DA",
            dark: "#00338D",
          },
          // Shades of grey
          secondary: {
            // Icons
            main: "#3d3d3d",
            // Title
            light: "#7F7F7F",
            // Text
            dark: "#2a2a2a",
            // Footer
            // footer: '#646464',
          },
          // Shades of red
          error: {
            // Font-colour
            main: "#DF011C",
            // Background
            light: "#FBD9D2",
            // Border
            dark: "#D70004",
          },
          info: {
            main: "#0288d1",
            light: "#03a9f4",
            dark: "#01579b",
          },
          // Shades
          shading: {
            // White
            dark: "#FFFFFF",
            // Black
            light: "#171717",
          },
          footer: {
            main: "RGB(243,242,241)",
            text: "#333333",
          },
        },
        spacing: 1,
        typography: {
          fontFamily: [
            "Source Sans Pro",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
          ].join(","),
          // Header
          h1: {
            fontSize: 24,
            fontWeight: "bolder",
          },
          // Title
          h2: {
            fontSize: 18,
            fontWeight: 400,
          },
          // Welcome Title
          h3: { fontSize: 34 },
          // Subtitle
          subtitle1: {
            fontSize: 18,
            fontWeight: "bold",
          },
          body1: { fontSize: 16 },
          // Viewer logs
          body2: { fontSize: 16 },
          caption: { fontSize: 12 },
          subtext: { fontSize: 14 },
        },
      }),
    []
  );

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

DefaultThemeProvider.propTypes = { children: node.isRequired };

export default DefaultThemeProvider;

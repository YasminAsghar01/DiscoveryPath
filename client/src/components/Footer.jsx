import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { Box, Divider, Container } from "@mui/material";

//This uses MUI Box to create the footer which is seen on each page of the app
const Footer = () => {
  return (
    <React.Fragment>
      <CssBaseline />
      <Box
        component="footer"
        sx={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          height: 33,
          backgroundColor: "footer.main",
        }}
      >
        <Divider />
        <Container>
          <Typography
            variant="body1"
            align="center"
            sx={{
              fontWeight: 400,
              pt: 5,
              color: "footer.text",
              fontSize: 14,
            }}
          >
            {"Copyright © KPMGDiscoveryPath "}
            {new Date().getFullYear()}
          </Typography>
        </Container>
      </Box>
    </React.Fragment>
  );
}

export default Footer

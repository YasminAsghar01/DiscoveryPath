import { AppBar, Toolbar, styled, Typography, Button, Popper, IconButton, Divider, Link, Avatar } from "@mui/material";
import React from "react";
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { jwtDecode } from "jwt-decode";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  backgroundColor: "white"
});

const StyledPopper = styled(Popper)(() => ({
  maxWidth: "300px",
  backgroundColor: "white",
}));

const StyledPopperDiv = styled("div")(() => ({
  maxWidth: "300px",
  borderRadius: "10px",
  border: "1.75px solid #2D5592",
  padding: "15px",
}));

const linkStyle = {
  color: "rgb(45,93,154)"
};

const StyledButton = styled(Button)(`
  text-transform: none;
`);

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}

const Navbar = ({ onLogout }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userName = decodedToken.name;
  const userId = decodedToken.employeeId;
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const id = open ? "simple-popper" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
  };

  return (
    <AppBar sx={{ zIndex: 2 }} position="relative">
      <StyledToolbar sx={{ borderBottom: 2, borderBottomColor: "#2D5592" }}>
        <StyledButton
          href="/"
          style={linkStyle}
          sx={{ marginLeft: 25, marginRight: 50 }}
        >
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            KPMGDiscoveryPath
          </Typography>
        </StyledButton>
        <StyledButton
          href="/projects"
          style={linkStyle}
          sx={{ marginLeft: 0, marginRight: 50 }}
        >
          <Typography variant="span" sx={{ fontWeight: 400, fontSize: 17 }} style={{ fontWeight: window.location.pathname === '/projects' ? 'bold' : 'null', textDecoration: window.location.pathname === '/projects' ? 'underline 10px' : 'null' }}>
            Projects
          </Typography>
        </StyledButton>
        <StyledButton
          href="/pathways"
          style={linkStyle}
          sx={{ marginLeft: 0, marginRight: "auto" }}
        >
          <Typography variant="span" sx={{ fontWeight: 400, fontSize: 17 }} style={{ fontWeight: window.location.pathname === '/pathways' ? 'bold' : 'null', textDecoration: window.location.pathname === '/pathways' ? 'underline 10px' : 'null' }}>
            Pathways
          </Typography>
        </StyledButton>
        <ClickAwayListener onClickAway={handleClose}>
          <IconButton
            aria-label=""
            aria-describedby={id}
            disableFocusRipple={true}
            size="small"
            sx={{ marginTop: 7, marginRight: 15 }}
            onClick={handleClick}
          >
            <Avatar {...stringAvatar(userName)} />
          </IconButton>
        </ClickAwayListener>
        <StyledPopper
          id={id}
          placement="bottom-end"
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          sx={{ zIndex: 2 }}
        >
          <StyledPopperDiv>
            <Typography
              sx={{
                fontSize: 17,
                fontWeight: 600,
                padding: 5,
                textDecoration: "underline",
                textAlign: "center",
              }}
            >
              My Details:
            </Typography>

            <Link href={`/profiles/${userId}`} sx={{ textDecoration: "none", color: "black" }} >
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 400,
                  marginLeft: 0,
                  marginRight: 50,
                  padding: 5,
                }}
                style={{ fontWeight: window.location.pathname === `/profiles/${encodeURIComponent(userId)}` ? 'bold' : 'null' }}
              >
                Profile
              </Typography>
            </Link>
            <Divider sx={{ paddingBottom: 4 }} />
            <Link href="/achievements" sx={{ textDecoration: "none", color: "black" }}>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 400,
                  marginLeft: 0,
                  marginRight: 50,
                  padding: 5
                }}
                style={{ fontWeight: window.location.pathname === '/achievements' ? 'bold' : 'null' }}
              >
                Learning and Achievements
              </Typography>
            </Link>
            <Divider sx={{ paddingBottom: 4 }} />
            <Link href="/favourites" sx={{ textDecoration: "none", color: "black" }}>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 400,
                  marginLeft: 0,
                  marginRight: 50,
                  padding: 5
                }}
                style={{ fontWeight: window.location.pathname === '/favourites' ? 'bold' : 'null' }}
              >
                Favourites
              </Typography>
            </Link>
            <Divider sx={{ paddingBottom: 4 }} />
            <Link href="/messages" sx={{ textDecoration: "none", color: "black" }}>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 400,
                  marginLeft: 0,
                  marginRight: 50,
                  padding: 5
                }}
                style={{ fontWeight: window.location.pathname === '/messages' ? 'bold' : 'null' }}
              >
                Messages
              </Typography>
            </Link>
            <Divider sx={{ paddingBottom: 4 }} />
            <Link onClick={handleLogout} sx={{ textDecoration: "none", color: "black", cursor: "pointer" }}>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 400,
                  marginLeft: 0,
                  marginRight: 70,
                  padding: 5
                }}
                style={{ fontWeight: window.location.pathname === '/logout' ? 'bold' : 'null' }}
              >
                Log out
              </Typography>
            </Link>
          </StyledPopperDiv>
        </StyledPopper>
      </StyledToolbar>
    </AppBar>
  );
};

export default Navbar;

import {
  AppBar,
  Toolbar,
  styled,
  Typography,
  Button,
  Popper,
  IconButton,
  Divider,
  Link
} from "@mui/material";
import React from "react";
import Avatar from '@mui/material/Avatar';

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
  borderRadius: "5px",
  borderColor: "red",
  border: "1.75px solid #2D5592",
  padding: "1rem",
  margin: "0.25rem 0px",
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

const Navbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const id = open ? "simple-popper" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="relative">
      <StyledToolbar sx={{ borderBottom: 2, borderBottomColor: "#2D5592"}}>
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
          sx={{ marginLeft: 0, marginRight: 50}}

        >
          <Typography variant="span" sx={{ fontWeight: 400, fontSize: 17 }}>
            Projects
          </Typography>
        </StyledButton>
        <StyledButton
          href="/pathways"
          style={linkStyle}
          sx={{ marginLeft: 0, marginRight: "auto" }}
        >
          <Typography variant="span" sx={{ fontWeight: 400, fontSize: 17 }}>
            Pathways
          </Typography>
        </StyledButton>
        <IconButton
          aria-label=""
          aria-describedby={id}
          disableFocusRipple={true}
          size="small"
          sx={{ marginTop: 7, marginRight: 15 }}
          onClick={handleClick}
        >
          <Avatar {...stringAvatar('Yasmin Asghar')} />
        </IconButton>

        <StyledPopper
          id={id}
          placement="bottom-end"
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
        >
          <StyledPopperDiv>
            <Link href="/profile"  sx={{ textDecoration: "none", color: "black" }}>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 400,
                  marginLeft: 0,
                  marginRight: 50,
                }}
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
                }}
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
                }}
              >
                Achievements
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
                }}
              >
                Messages
              </Typography>
            </Link>
            <Divider sx={{ paddingBottom: 4 }} />
            <Link href="/logout" sx={{ textDecoration: "none", color: "black" }}>
              <Typography
                sx={{
                  fontSize: 15,
                  fontWeight: 400,
                  marginLeft: 0,
                  marginRight: 70,
                }}
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

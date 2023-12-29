import React from "react";
import { Button, Grid, Container, ClickAwayListener, Grow, ButtonGroup, Popper, Paper, MenuItem, MenuList } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { ArrowDropDown } from "@mui/icons-material";


const ProjectButton = ({ options }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleMenuItemClick = (event, index, type = "null") => {
    setSelectedIndex(index);
    setOpen(false); // Closes the dropdown, reactive behaviour
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup ref={anchorRef} aria-label="split button">
        <Button
          sx={{
            textTransform: "capitalize",
            color: "rgba(0, 0, 0, 0.7)",
            borderColor: "rgba(0, 0, 0, 0.4)",
            paddingY: 5,

            fontSize: 16,
            backgroundColor: "white",
            '&:hover': {
              borderColor: "rgba(0, 0, 0, 0.4)",
              cursor: 'default',
            },
          }}
        >
          {options[selectedIndex]}
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{
            borderColor: "rgba(0, 0, 0, 0.4)", backgroundColor: "white", '&:hover': {
              borderColor: "rgba(0, 0, 0, 0.4)",
            },
          }}

        >
          <ArrowDropDown sx={{
            color: "rgba(0, 0, 0, 0.4)", backgroundColor: "white", '&:hover': {
              borderColor: "rgba(0, 0, 0, 0.4)",
            },
          }} />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
          height: 200
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) =>
                        handleMenuItemClick(event, index)
                      }
                      sx={{ textTransform: "capitalize" }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};


const Projects = () => {

  const projectOptions = [
    "All Projects",
    "My Projects",
  ];

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/project-list")
      .then((res) => res.json().then((data) => setData(data.message)));
  }, []);

  return (
    <>
      <h1 style={{ fontWeight: 400, fontSize: 30, marginBottom: 20, marginTop: 50 }}>Projects</h1>
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          backgroundColor: "#F7F5F5",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          overflow: "auto",
        }}
      >
        <div style={{
          position: 'absolute',
          top: 25,
          left: 25
        }}>
          <ProjectButton options={projectOptions} />
        </div>
        <Grid container spacing={12}  >
          {!data ? "Loading..." : data.map((project) => (
            <Grid style={{ padding: "25px" }} item xs="3">
              <ProjectCard cardcontent={project} />
            </Grid>
          ))}
        </Grid>
        <Grid container spacing={12}  >
          {!data ? "Loading..." : data.map((project) => (
            <Grid style={{ padding: "25px" }} item xs="3">
              <ProjectCard cardcontent={project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Projects;

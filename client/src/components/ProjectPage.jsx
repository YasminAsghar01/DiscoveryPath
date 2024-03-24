import React from "react";
import { Button, Grid, Container, ClickAwayListener, Grow, ButtonGroup, Popper, Paper, Divider } from "@mui/material";
import ProjectCard from "./ProjectCard";
import { ArrowDropDown } from "@mui/icons-material";
import { Box, TextField } from '@mui/material'
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SearchBar from "./Searchbar";
import FilterDropdown from "./FilterDropdown";
import { jwtDecode } from "jwt-decode";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip';

const AddProjectButton = ({ setReloadProjects }) => {
  const [openProject, setOpenProject] = React.useState(false);
  const [technologies, setTechnologies] = React.useState([]);

  const handleClickOpenProject = () => {
    setOpenProject(true);
  };

  const handleCloseProject = () => {
    setOpenProject(false);
  };

  const handleTechChange = (event) => {
    const input = event.target.value;
    const techArray = input.split(',').map((s) => s.trim());
    setTechnologies(techArray);
  };

  const handleSubmitProject = async (event) => {
    const data = new FormData(event.currentTarget);
    const formData = {
      name: data.get('name'),
      description: data.get('description'),
      start_date: data.get('start_date').toString(),
      end_date: data.get('end_date').toString(),
      project_lead: data.get('project_lead'),
      technologies: technologies,
    };
    console.log(JSON.stringify(formData))
    try {
      const url = `http://localhost:3001/projects/${formData.name}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error('Adding project failed');
      }
    } catch (error) {
      console.error('Adding project failed:', error.message);
    }
  };

  return (
    <>
      <Tooltip title="Add project" arrow>
        <Button className="addskillbutton" onClick={handleClickOpenProject}
          style={{
            marginLeft: 55, fontSize: 15, maxHeight: 35, minWidth: 50,
          }}>
          <AddBoxIcon sx={{ color: '#2D5592', fontSize: 42 }} /></Button>
      </Tooltip>
      <Dialog
        open={openProject}
        onClose={handleCloseProject}
        PaperProps={{
          component: 'form',
          onSubmit: async (event) => {
            event.preventDefault();
            await handleSubmitProject(event);
            setReloadProjects(true)
          },
        }}
      >
        <DialogTitle textAlign={'center'}>Add a new project</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Project Name"
            type="name"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            multiline
            maxRows={4}
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="start_date"
            name="start_date"
            label="Start Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
              style: { marginTop: '5px' }
            }}
            InputProps={{ style: { marginTop: '15px' } }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="end_date"
            name="end_date"
            label="End Date"
            type="date"
            fullWidth
            variant="standard"
            InputLabelProps={{
              shrink: true,
              style: { marginTop: '5px' }
            }}
            InputProps={{ style: { marginTop: '15px' } }}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="project_lead"
            name="project_lead"
            label="Project Lead ID"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="technologies"
            name="technologies"
            label="Technologies Used"
            type="text"
            fullWidth
            variant="standard"
            value={technologies.join(', ')}
            onChange={handleTechChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseProject} >Cancel</Button>
          <Button onClick={handleCloseProject} type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const FilterMenu = () => {
  const names = [
    ['Languages'],
    ['Libraries'],
    ['Tools'],
    ['Start Date'],
    ['End Date']
  ];

  const [state, setState] = React.useState({
    javascript: false,
    python: false,
    java: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { javascript, python, java } = state;
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleMenuItemClick = (event, index, type = "null") => {
  //   setSelectedIndex(index);
  //   setOpen(false);
  // };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  // const handleClick = (event, index) => {
  //   setAnchorEl(event.currentTarget);
  //   setSelectedIndex(index);
  // };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setAnchorEl(null);
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
          <FilterListIcon sx={{ marginRight: 10 }} />
          Filters
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
          zIndex: 2,
          height: 200,
          width: 250,

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
            <Paper sx={{ maxHeight: 250, overflow: "auto", padding: 5 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <div>
                  {names.map((option) => (
                    <div>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          sx={{
                            flexDirection: 'row-reverse', // Change the direction to have the icon on the left
                            '& .MuiAccordionSummary-content': {
                              marginLeft: 0, // Adjust margin as needed
                            },
                          }}
                        >
                          <Typography>{option[0]}</Typography>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails>
                          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <Checkbox checked={javascript} onChange={handleChange} name="javascript" />
                                }
                                label="javascript"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox checked={python} onChange={handleChange} name="python" />
                                }
                                label="python"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox checked={java} onChange={handleChange} name="java" />
                                }
                                label="java"
                              />
                            </FormGroup>
                          </FormControl>
                        </AccordionDetails>
                      </Accordion>
                    </div>
                  ))}
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};


const Projects = () => {
  const [data, setData] = React.useState(null);
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All Projects");
  const [likedProject, setLikedProject] = useState([]);
  const [reloadProjects, setReloadProjects] = React.useState(false)

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const userId = decodedToken.employeeId;

  const projectOptions = [
    "All Projects",
    "Available Projects",
  ];

  React.useEffect(() => {
    const filtered = data?.filter((item) => {
      const match = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      if (selectedFilter === "Available Projects") {
        return match && item.openRoles.length > 0;
      }
      return match;
    });
    setFilteredData(filtered);
  }, [searchQuery, data, selectedFilter]);

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (selectedOption) => {
    setSelectedFilter(selectedOption);

    if (selectedOption === "All Projects") {
      setFilteredData(data);
    } else {
      const filtered = data?.filter((item) =>
        item.openRoles.length > 0
      );
      setFilteredData(filtered);
    }
  };

  React.useEffect(() => {
    fetch("/projects")
      .then((res) => res.json().then((data) => {
        setData(data)
        setReloadProjects(false)
      }))
      .catch((error) => console.error("Error fetching data:", error));
  }, [reloadProjects]);

  React.useEffect(() => {
    fetch(`/profile/${userId}`)
      .then((res) => res.json().then((data) => setLikedProject(data.favouriteProjects)))
      .catch((error) => console.error("Error fetching data:", error));
  }, [userId, data?.favouriteProjects]);

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
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          minHeight: '100vh',
          overflow: "auto",
          paddingTop: "20px",
          maxHeight: 'calc(100vh - 100px)',
          top: 0
        }}
      >
        <Box
          sx={{
            display: "flex",
            position: "sticky",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            marginLeft: 30,
            marginTop: 20,
            paddingBottom: 30,
          }}
        >
          <div style={{ marginRight: 40 }}>
            <FilterDropdown options={projectOptions} onFilterChange={handleFilterChange} />
          </div>
          <div style={{ marginRight: 40 }}>
            <FilterMenu />
          </div>
          <SearchBar searchQuery={searchQuery} setSearchQuery={handleSearchQuery} />
          <div style={{ marginLeft: 255 }}>
            {userRole === 'Resource Manager' ? <AddProjectButton setReloadProjects={setReloadProjects} /> : null}
          </div>
        </Box>

        <Grid sx={{ overflow: 'auto', maxHeight: '100vh' }} container spacing={2}  >
          {!data ? "Loading..." : filteredData?.map((project, index) => (
            <Grid key={index} style={{ padding: "25px" }} item xs={12} sm={6} md={4} lg={3}>
              <ProjectCard cardcontent={project} setLikedProject={setLikedProject} likedProject={likedProject} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Projects;

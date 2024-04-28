import React from "react";
import { useState } from 'react'
import { jwtDecode } from "jwt-decode";
import ProjectCard from "./ProjectCard";
import SearchBar from "./Searchbar";
import FilterMenu from "./FilterMenu";
import FilterDropdown from "./FilterDropdown";
import {
  Button, Grid, Container, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip
} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

// this button appear for a resource manager so they can create a project
const AddProjectButton = ({ setReloadProjects }) => {
  const [openProject, setOpenProject] = React.useState(false);
  const [technologies, setTechnologies] = React.useState([]);
  const [team_members, setTeamMembers] = React.useState([]);

  const handleClickOpenProject = () => {
    setOpenProject(true);
  };

  const handleCloseProject = () => {
    setOpenProject(false);
  };

  // adds users input into an array
  const handleTechChange = (event) => {
    const input = event.target.value;
    const techArray = input.split(',').map((s) => s.trim());
    setTechnologies(techArray);
  };

  const handleTeamMemberChange = (event) => {
    const input = event.target.value;
    const teamMemberArray = input.split(',').map((s) => s.trim());
    setTeamMembers(teamMemberArray);
  }

  // post request creates a project
  const handleSubmitProject = async (event) => {
    const data = new FormData(event.currentTarget);
    const formData = {
      name: data.get('name'),
      description: data.get('description'),
      start_date: data.get('start_date').toString(),
      end_date: data.get('end_date').toString(),
      project_lead: data.get('project_lead'),
      technologies: technologies,
      team_members: team_members
    };
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
      if (!response.ok) {
        throw new Error('Adding project failed');
      }
    } catch (error) {
      console.error('Adding project failed:', error.message);
    }
  };

  return (
    <>
      {/* shows form to create project when add button is clicked */}
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
          <TextField
            autoFocus
            margin="dense"
            id="team_members"
            name="team_members"
            label="Team Members ID"
            type="text"
            fullWidth
            variant="standard"
            value={team_members.join(', ')}
            onChange={handleTeamMemberChange}
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

  //options passed to FilterDropdown component
  const projectOptions = [
    "All Projects",
    "Available Projects",
    "Favourite Projects",
  ];

  // filtering options passed to FilterMenu component
  const filter_options = [
    {
      heading: 'Languages',
      options: ['JavaScript', 'Python', 'Java', 'C++']
    },
    {
      heading: 'Libraries',
      options: ['React', 'Vue', 'Angular']
    },
    {
      heading: 'Tools',
      options: ['GitHub', 'Jira', 'Bitbucket']
    },
    {
      heading: 'Duration',
      options: ['Days', 'Weeks', 'Months', 'Years']
    },
  ];

  // filters project cards based on users search query and dropdown option
  React.useEffect(() => {
    const filtered = data?.filter((item) => {
      const match = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      if (selectedFilter === "Available Projects") {
        return match && item.openRoles.length > 0;
      }
      else if (selectedFilter === "Favourite Projects") {
        return match && likedProject.includes(item.name);
      }
      return match;
    });
    setFilteredData(filtered);
  }, [searchQuery, data, selectedFilter, likedProject]);

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  };

  // filters project cards based on dropdown
  const handleFilterChange = (selectedOption) => {
    setSelectedFilter(selectedOption);

    if (selectedOption === "All Projects") {
      setFilteredData(data);
    }
    else if (selectedFilter === "Favourite Projects") {
      const filtered = data?.filter((item) =>
        likedProject.includes(item.name)
      );
      setFilteredData(filtered);
    }
    else {
      const filtered = data?.filter((item) =>
        item.openRoles.length > 0
      );
      setFilteredData(filtered);
    }
  };

  // retrieves all projects
  React.useEffect(() => {
    fetch("/projects")
      .then((res) => res.json().then((data) => {
        setData(data)
        setReloadProjects(false)
      }))
      .catch((error) => console.error("Error fetching data:", error));
  }, [reloadProjects]);

  // retrieves the users favourite projects
  React.useEffect(() => {
    fetch(`/profiles/${userId}`)
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
            <FilterMenu options={filter_options} />
          </div>
          <SearchBar searchQuery={searchQuery} setSearchQuery={handleSearchQuery} />
          <div style={{ marginLeft: 200 }}>
            {userRole === 'Resource Manager' ? <AddProjectButton setReloadProjects={setReloadProjects} /> : null}
          </div>
        </Box>
        {/* passes information to project card component to create project card for each project */}
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

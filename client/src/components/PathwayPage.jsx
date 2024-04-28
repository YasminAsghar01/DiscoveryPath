import React from "react";
import { jwtDecode } from "jwt-decode";
import { useState } from 'react'
import PathwayCard from "./PathwayCard";
import SearchBar from "./Searchbar";
import FilterDropdown from "./FilterDropdown";
import FilterMenu from "./FilterMenu";
import {
  Button, Grid, Container, Box, TextField, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip
} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';

// this button appear for a resource manager so they can create a pathway
const AddPathwayButton = ({ setReloadPathways }) => {
  const [openPathway, setOpenPathway] = React.useState(false);

  const handleClickOpenPathway = () => {
    setOpenPathway(true);
  };

  const handleClosePathway = () => {
    setOpenPathway(false);
  };

  const [skills, setSkills] = React.useState([]);

  // adds users input into an array
  const handleTechChange = (event) => {
    const input = event.target.value;
    const skillArray = input.split(',').map((s) => s.trim());
    setSkills(skillArray);
  };

  // post request creates a pathway
  const handleSubmitProject = async (event) => {
    const data = new FormData(event.currentTarget);
    const formData = {
      name: data.get('name'),
      description: data.get('description'),
      pathway_link: data.get('pathway_link').toString(),
      duration: data.get('duration').toString(),
      certification: data.get('certification'),
      skills_gained: skills,

    };
    try {
      const url = `http://localhost:3001/pathways/${formData.name}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error('Adding pathway failed');
      }
    } catch (error) {
      console.error('Adding pathway failed:', error.message);
    }
  };

  return (
    <>
      {/* shows form to create pathway when add button is clicked */}
      <Tooltip title="Add pathway" arrow>
        <Button className="addskillbutton" onClick={handleClickOpenPathway} style={{
          marginLeft: 55, fontSize: 15, maxHeight: 35, minWidth: 50
        }}><AddBoxIcon sx={{ color: '#2D5592', fontSize: 42 }} /></Button>
      </Tooltip>
      <Dialog
        open={openPathway}
        onClose={handleClosePathway}
        PaperProps={{
          component: 'form',
          onSubmit: async (event) => {
            event.preventDefault();
            await handleSubmitProject(event);
            setReloadPathways(true)
          },
        }}
      >
        <DialogTitle textAlign={'center'}>Add a new pathway</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Learning Pathway Name"
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
            id="pathway_link"
            name="pathway_link"
            label="Pathway Link"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="duration"
            name="duration"
            label="Duration"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="certification"
            name="certification"
            label="Professional Certification"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="skills_gained"
            name="skills_gained"
            label="Skills Gained"
            type="text"
            fullWidth
            variant="standard"
            value={skills.join(', ')}
            onChange={handleTechChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePathway} >Cancel</Button>
          <Button onClick={handleClosePathway} type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const Pathways = () => {
  const [data, setData] = React.useState(null);
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All Pathways");
  const [likedPathway, setLikedPathway] = useState([]);
  const [reloadPathways, setReloadPathways] = React.useState(false)

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userRole = decodedToken.role;
  const userId = decodedToken.employeeId;

  //options passed to FilterDropdown component
  const projectOptions = [
    "All Pathways",
    "Completed Pathways",
    "Favourite Pathways",
  ];

  // filters pathway cards based on users search query and dropdown option
  React.useEffect(() => {
    const filtered = data?.filter((item) => {
      const match = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      if (selectedFilter === "Completed Pathways") {
        return match && item.completedUsers.length > 0;
      }
      else if (selectedFilter === "Favourite Pathways") {
        return match && likedPathway.includes(item.name);
      }
      return match;
    });
    setFilteredData(filtered);
  }, [searchQuery, data, selectedFilter, likedPathway]);

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  };

  // filters pathway cards based on dropdown
  const handleFilterChange = (selectedOption) => {
    setSelectedFilter(selectedOption);

    if (selectedOption === "All Pathways") {
      setFilteredData(data);
    }
    else if (selectedFilter === "Favourite Pathways") {
      const filtered = data?.filter((item) =>
        likedPathway.includes(item.name)
      );
      setFilteredData(filtered);
    }
    else {
      const filtered = data?.filter((item) =>
        item.completedUsers.length > 0
      );
      setFilteredData(filtered);
    }
  };

  // retrieves all pathways
  React.useEffect(() => {
    fetch("/pathways")
      .then((res) => res.json().then((data) => setData(data)))
      .catch((error) => console.error("Error fetching data:", error));
  }, [reloadPathways]);

  // retrieves the users favourite pathways
  React.useEffect(() => {
    fetch(`/profiles/${userId}`)
      .then((res) => res.json().then((data) => setLikedPathway(data.favouritePathways)))
      .catch((error) => console.error("Error fetching data:", error));
  }, [userId, data?.favouritePathways]);

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
    {
      heading: 'Certification',
      options: ['AZ-900', 'AWS Basics']
    }
  ];

  return (
    <>
      <h1 style={{ fontWeight: 400, fontSize: 30, marginBottom: 20, marginTop: 50 }}>Pathways</h1>
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
            {userRole === 'Resource Manager' ? <AddPathwayButton setReloadPathways={setReloadPathways} /> : null}
          </div>
        </Box>
        {/* passes information to pathway card component to create pathway card for each pathway */}
        <Grid sx={{ overflow: 'auto', maxHeight: '100vh' }} container spacing={2}  >
          {!data ? "Loading..." : filteredData?.map((project, index) => (
            <Grid key={index} style={{ padding: "25px" }} item xs={12} sm={6} md={4} lg={3}>
              <PathwayCard cardcontent={project} setLikedPathway={setLikedPathway} likedPathway={likedPathway} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Pathways;

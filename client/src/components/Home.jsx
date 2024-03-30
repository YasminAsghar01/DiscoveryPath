import React from 'react'
import { Grid } from '@mui/material'
import { jwtDecode } from "jwt-decode";
import ProjectCard from "./ProjectCard";
import PathwayCard from './PathwayCard';

const Home = () => {
  const [projectData, setProjects] = React.useState(null);
  const [pathwayData, setPathways] = React.useState(null);
  const [likedPathway, setLikedPathway] = React.useState([]);
  const [likedProject, setLikedProject] = React.useState([]);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userName = decodedToken.name;
  const employeeId = decodedToken.employeeId

  React.useEffect(() => {
    fetch(`/profiles/${employeeId}`)
      .then((res) => res.json().then((data) => setLikedProject(data.favouriteProjects)))
      .catch((error) => console.error("Error fetching data:", error));
  }, [employeeId]);

  React.useEffect(() => {
    fetch(`/profiles/${employeeId}`)
      .then((res) => res.json().then((data) => setLikedPathway(data.favouritePathways)))
      .catch((error) => console.error("Error fetching data:", error));
  }, [employeeId]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/suggestions/projects/${employeeId}`);
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [employeeId]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/suggestions/pathways/${employeeId}`);
        const data = await response.json();
        setPathways(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [employeeId]);

  return (
    <div style={{ marginLeft: 10 }}>
      <div style={{ marginLeft: 30, marginRight: 30, marginTop: 30, marginBottom: 37 }}>
        <h1 style={{ fontWeight: 400, fontSize: 30, marginBottom: 0, marginTop: 50 }}>Welcome {userName}</h1>
        <p align="left" style={{ marginTop: 20, paddingLeft: 25, fontWeight: 700 }} >Suggested Projects:</p>
        <Grid sx={{ overflow: 'auto', maxHeight: '100vh' }} container spacing={2}  >
          {!projectData ? "Loading..." : projectData?.map((project, index) => (
            <Grid key={index} style={{ padding: "25px" }} item xs={12} sm={6} md={4} lg={3}>
              <ProjectCard cardcontent={project} setLikedProject={setLikedProject} likedProject={likedProject} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div style={{ marginLeft: 30, marginRight: 30, marginTop: 30, marginBottom: 37 }}>
        <p align="left" style={{ paddingLeft: "25px", fontWeight: 700 }} > Suggested Pathways: </p>
        <Grid sx={{ overflow: 'auto', maxHeight: '100vh' }} container spacing={2}  >
          {!pathwayData ? "Loading..." : pathwayData?.map((pathway, index) => (
            <Grid key={index} style={{ padding: "25px" }} item xs={12} sm={6} md={4} lg={3}>
              <PathwayCard cardcontent={pathway} setLikedPathway={setLikedPathway} likedPathway={likedPathway} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default Home

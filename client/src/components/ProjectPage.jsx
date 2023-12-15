import React from "react";
import Grid from '@mui/material/Grid';
import { Button, Card, CardActions, CardContent } from "@mui/material";
import ProjectCard from "./ProjectCard";

const Projects = () => {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/project-list")
      .then((res) => res.json().then((data) => setData(data.message)));
  }, []);

  return (
    <>
      <h1>Projects</h1>
      <h3 align="left" style={{ paddingLeft: "25px" }} > Suggested for you: </h3>
          <Grid container spacing={12}  >
          {!data ? "Loading..." : data.map((project) => (
            <Grid style={{ padding: "25px" }} item xs="3">
              <ProjectCard cardcontent={project} />
            </Grid>

        ))}
      </Grid>
      <h3 align="left" style={{ paddingLeft: "25px" }} > All projects: </h3>
          <Grid container spacing={12}  >
          {!data ? "Loading..." : data.map((project) => (
            <Grid style={{ padding: "25px" }} item xs="3">
              <ProjectCard cardcontent={project} />
            </Grid>

        ))}
      </Grid>
    </>
  )
}

export default Projects;

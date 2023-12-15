import React from "react";
import { Button, Card, CardActions, CardContent } from "@mui/material";
import Grid from '@mui/material/Grid';
import PathwayCard from './PathwayCard'

function Pathways() {

  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/project-list")
      .then((res) => res.json().then((data) => setData(data.message)));
  }, []);

  return (
    <>
      <h1>Learning paths</h1>
      <div style={{ marginLeft: 10 }}>
        <h3 align="left" style={{ paddingLeft: "25px" }} > Recommended: </h3>
        <Grid container spacing={12}  >
          {!data ? "Loading..." : data.map((pathway) => (
            <Grid style={{ padding: "25px" }} item xs="3">
              <PathwayCard cardcontent={pathway} />
            </Grid>
          ))}
        </Grid>

        <h3 align="left" style={{ paddingLeft: "25px" }} > All KPMG personalised pathways: </h3>
        <Grid container spacing={12}  >
          {!data ? "Loading..." : data.map((pathway) => (
            <Grid style={{ padding: "25px" }} item xs="3">
              <PathwayCard cardcontent={pathway} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  )
}

export default Pathways;

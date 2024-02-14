import React from 'react'
import { Grid } from '@mui/material'
import HomeCard from './HomeCard'
import { jwtDecode } from "jwt-decode";

const Home = () => {
  const token = localStorage.getItem("token");

  // Decode the token
  const decodedToken = jwtDecode(token);

  // Access user information from the decoded token
  const userId = decodedToken.id;
  console.log(userId)
  const userName = decodedToken.name;

  var data = ["number", "hello", "test", "test"]

  return (
    <div style={{ marginLeft: 10 }}>
      <div style={{ marginLeft: 30, marginRight: 30, marginTop: 30, marginBottom: 37 }}>
        <h1 style={{ fontWeight: 400, fontSize: 30, marginBottom: 0, marginTop: 50 }}>Welcome {userName}</h1>
        <p align="left" style={{ marginTop: 20, paddingLeft: 25, fontWeight: 700 }} >Continue learning:</p>
        <Grid container spacing={12}  >
          {!data ? "Loading..." : data.map(() => (
            <Grid style={{ padding: "25px" }} item xs="3">
              <HomeCard />
            </Grid>
          ))}
        </Grid>
      </div>
      <div style={{ marginLeft: 30, marginRight: 30, marginTop: 30, marginBottom: 37 }}>
        <p align="left" style={{ paddingLeft: "25px", fontWeight: 700 }} > Suggested for you: </p>
        <Grid container spacing={12}  >
          {!data ? "Loading..." : data.map(() => (
            <Grid style={{ padding: "25px" }} item xs="3">
              <HomeCard />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}

export default Home

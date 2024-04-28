import React from 'react'
import { jwtDecode } from "jwt-decode";

// this displays the users favourites projects and pathways in a list
export default function Favourites() {
  const [likedPathway, setLikedPathway] = React.useState([]);
  const [likedProject, setLikedProject] = React.useState([]);

  const token = localStorage.getItem("token"); // gets the users JWT token
  const decodedToken = jwtDecode(token);
  const employeeId = decodedToken.employeeId

  // gets all the projects the user has favourited
  React.useEffect(() => {
    fetch(`/profiles/${employeeId}`)
      .then((res) => res.json().then((data) => setLikedProject(data.favouriteProjects)))
      .catch((error) => console.error("Error fetching data:", error));
  }, [employeeId]);

  // gets all the pathways the user has favourited
  React.useEffect(() => {
    fetch(`/profiles/${employeeId}`)
      .then((res) => res.json().then((data) => setLikedPathway(data.favouritePathways)))
      .catch((error) => console.error("Error fetching data:", error));
  }, [employeeId]);

  // This maps the project and pathway cards suggested to the user
  return (
    <div style={{ marginLeft: 30, marginRight: 30, marginTop: 30, marginBottom: 37 }}>
      <h1 style={{ fontWeight: 400, fontSize: 30, marginBottom: 0, marginTop: 50 }}>Favourite projects</h1>
      <div>
        {likedProject.map((item, index) => (
          <span key={index}>{item}{index !== likedProject.length - 1 ? ', ' : ''}</span>
        ))}
      </div>
      <h1 style={{ fontWeight: 400, fontSize: 30, marginBottom: 0, marginTop: 50 }}>Favourite pathways</h1>
      <div>
        {likedPathway.map((item, index) => (
          <span key={index}>{item}{index !== likedProject.length - 1 ? ', ' : ''}</span>
        ))}
      </div>
    </div>
  )
}

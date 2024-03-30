import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Grid, IconButton, formLabelClasses } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import { jwtDecode } from "jwt-decode";

export default function ProjectCard({ cardcontent, setLikedProject, likedProject }) {
  const navigate = useNavigate();
  const onReserve = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page.
    navigate(`/projects/${encodeURIComponent(cardcontent.name)}`, {
      state: {
        project: cardcontent, // Pass the `location` prop as state to this route.
      }
    })
  }

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.employeeId;

  const isInLiked = () => {
    const inLiked = likedProject.find(item => item===cardcontent.name );
    if (inLiked) {
      const deleteFavourite = async () => {
        const projectName = cardcontent.name
        try {
          const response = await fetch(`/profiles/${userId}/favouriteProject/${projectName}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            throw new Error('Failed to delete heart from database');
          }
          else {
            setLikedProject(likedProject.filter(p=> p !==projectName))
            return
          }

        } catch (error) {
          console.error('Error removing heart from database:', error);
        }
      };
      deleteFavourite()
    }
    else {
      setLikedProject([...likedProject, cardcontent.name])
      const submitFavourite = async () => {
        const formData = {
          name: cardcontent.name
        };
        console.log(JSON.stringify(formData))
        try {
          const url = `http://localhost:3001/profiles/${userId}/favouriteProject`;
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
            throw new Error('Failed to update favourite');
          }

        } catch (error) {
          console.error('Failed to update favourite:', error.message);
        }
      };
      submitFavourite()
    }
  }
  const [projectLeadName, setProjectLeadName] = React.useState(null);
  React.useEffect(() => {
    const fetchEmployeeData = async (userId) => {
      try {
        const response = await fetch(`/profiles/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        const employeeData = await response.json();
        setProjectLeadName(employeeData.name)
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    fetchEmployeeData(cardcontent.project_lead)

  }, [cardcontent.project_lead]);

  return (
    <Card sx={{ maxWidth: 345, minHeight: 300, zIndex: 1 }}>
      <div style={{ marginTop: 15, marginBottom: -30, marginLeft: 165, zIndex:0 }}>
        <IconButton onClick={isInLiked} >
          {likedProject.includes(cardcontent.name ) ? <FavoriteOutlinedIcon color="primary" /> : <FavoriteBorderOutlinedIcon />}
        </IconButton>
      </div>
      <CardHeader sx={{ paddingTop: 30 }} title={cardcontent.name} />
      <CardContent>
        <Typography variant="body2" color="text.secondary" paddingBottom={30}>
          {cardcontent.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" paddingBottom={30}>
          Led by: {projectLeadName}
        </Typography>
        <div style={{ marginTop: 'auto', paddingTop: 15, zIndex: -1 }}>
          <Button onClick={onReserve} variant="contained" className="project-button" style={{
            backgroundColor: '#2D5592', color: 'white', height: 25, textTransform: "capitalize"
          }} >
            See Project
          </Button>
        </div>
      </CardContent>
    </Card >
  );
}

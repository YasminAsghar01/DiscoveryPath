import * as React from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardContent, Typography, Button, IconButton } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';

export default function ProjectCard({ cardcontent, setLikedPathway, likedPathway }) {
  const navigate = useNavigate();
  // navigates to specific pathway page
  const onReserve = () => {
    window.scrollTo(0, 0);
    navigate(`/pathways/${encodeURIComponent(cardcontent.name)}`, {
      state: {
        pathway: cardcontent,
      }
    })
  }

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.employeeId;

  const isInLiked = () => {
    const inLiked = likedPathway.find(item => item === cardcontent.name);
    if (inLiked) {  // if user has already liked the pathway, will delete this from their favourites
      const deleteFavourite = async () => {
        const pathwayName = cardcontent.name
        try {
          const response = await fetch(`/profiles/${userId}/favouritePathway/${pathwayName}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            }
          });
          if (!response.ok) {
            throw new Error('Failed to delete heart from database');
          }
          else {
            setLikedPathway(likedPathway.filter(p => p !== pathwayName))
            return
          }
        } catch (error) {
          console.error('Error removing heart from database:', error);
        }
      };
      deleteFavourite()
    }
    else {
      setLikedPathway([...likedPathway, cardcontent.name])
      const submitFavourite = async () => { // add pathway to users favourites
        const formData = {
          name: cardcontent.name
        };
        try {
          const url = `http://localhost:3001/profiles/${userId}/favouritePathway`;
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            body: JSON.stringify(formData),
          });
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

  return (
    <Card sx={{ maxWidth: 345, minHeight: 300, zIndex: 1 }}>
      <div style={{ marginTop: 15, marginBottom: -30, marginLeft: 165 }}>
        <IconButton onClick={isInLiked} >
          {/* if in users favourites, will show filled in heart icon */}
          {likedPathway.includes(cardcontent.name) ? <FavoriteOutlinedIcon color="primary" /> : <FavoriteBorderOutlinedIcon />}
        </IconButton>
      </div>
      <CardHeader sx={{ paddingTop: 30 }} title={cardcontent.name} />
      <CardContent>
        <Typography variant="body2" color="text.secondary" paddingBottom={30}>
          {cardcontent.description}
        </Typography>
        <Typography variant="body2" color="text.secondary" paddingBottom={30}>
          Duration: {cardcontent.duration}
        </Typography>
        <div style={{ marginTop: 'auto', paddingTop: 15 }}>
          <Button onClick={onReserve} variant="contained" className="project-button" style={{
            backgroundColor: '#2D5592', color: 'white', height: 25, textTransform: "capitalize"
          }} >
            See more detail
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

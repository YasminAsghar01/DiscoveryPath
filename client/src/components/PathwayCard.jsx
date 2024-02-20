import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function ProjectCard({ cardcontent }) {
  const navigate = useNavigate();
  
  const onReserve = () => { // Event handler for the "Make Reservation" button.
    window.scrollTo(0, 0); // Scroll to the top of the page.
    navigate(`/pathways/${encodeURIComponent(cardcontent.name)}`, { // Navigate to the "/make-reservation" route.
      state: {
        pathway: cardcontent, // Pass the `location` prop as state to this route.
      }
    })
  }

  return (
    <Card sx={{ maxWidth: 345, minHeight: 300 }}>
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
            backgroundColor: '#2D5592', color: 'white', height: 25
          }} >
            See more detail
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

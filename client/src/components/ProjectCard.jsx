import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function ProjectCard({ cardcontent }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title="AZ-900 Learning Pathway"
        subheader="Created: September 14, 2016"
      />
      <CardContent >
        <Typography variant="body2" color="text.secondary" paddingBottom={30}>
        {cardcontent}
        </Typography>
        <a href='/pathways'>
          <button >View all available projects</button>
        </a>
      </CardContent>
    </Card>
  );
}

import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function HomeCard() {

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        title="AZ-900 Learning Pathway"
        subheader="Created: September 14, 2016"
      />
      <CardContent >
        <Typography variant="body2" color="text.secondary" paddingBottom={30}>
          This learning pathway will give you an insight into Azure Fundamentals and example of how Azure is used in projects.
        </Typography>
        <a href='/pathways'>
          <button >View all available projects</button>
        </a>
      </CardContent>
    </Card>
  );
}

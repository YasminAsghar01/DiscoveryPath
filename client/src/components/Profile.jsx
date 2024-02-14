import * as React from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import {
  Typography,
  Avatar,
  Box
} from "@mui/material";
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

function stringToColor(string) {
  let hash = 0;
  let i;

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
  };
}



export default function Pathway() {

  const [data, setData] = React.useState(null);
  // Access the dynamic route parameter
  const { userName } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/profile/${userName}`);
        const data = await response.json();
        setData(data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userName]);

  return (
    <>
      {!data ? "Loading..." :
        <h1 style={{ fontWeight: 400, fontSize: 30, marginTop: 50 }}>My Profile</h1>
      }

      <Grid container spacing={600}>
        <Grid item xs={4}>
          <Card sx={{ height: 175, width: 500, marginLeft: 100, marginTop: 20, backgroundColor: '#F7F5F5' }}>
            <CardHeader sx={{ paddingTop: 20, paddingBottom: 10 }} titleTypographyProps={{ sx: { fontSize: 17, textDecoration: 'underline' } }} title='Contact Details' />
            <CardContent>
              <Box display="flex" >
                <Box marginRight={2}>
                  <Avatar alt={userName} style={{ width: 60, height: 55, marginLeft: 25, marginTop: 10 }} {...stringAvatar(userName)} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" paddingBottom={10} fontSize={15} textAlign={'left'} paddingLeft={10}>
                    Name: {data?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paddingBottom={10} fontSize={15} textAlign={'left'} paddingLeft={10}>
                    Email Address: {data?.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paddingBottom={10} fontSize={15} textAlign={'left'} paddingLeft={10}>
                    Work Number: {data?.work_number}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card sx={{ height: 175, width: 700, marginRight: 80, marginTop: 20, backgroundColor: '#F7F5F5' }}>
            <CardHeader sx={{ paddingTop: 20, paddingBottom: 10 }} titleTypographyProps={{ sx: { fontSize: 17, textDecoration: 'underline' } }} title='Organisation Details' />
            <CardContent>
              <Box display="flex" >
                <Box marginLeft={60}>
                  <Typography variant="body2" color="text.secondary" paddingBottom={10} fontSize={15} textAlign={'left'} paddingLeft={10}>
                    Grade: {data?.grade}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paddingBottom={10} fontSize={15} textAlign={'left'} paddingLeft={10}>
                    Team: {data?.team}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paddingBottom={10} fontSize={15} textAlign={'left'} paddingLeft={10}>
                    Performance Manager: {data?.manager}
                  </Typography>
                </Box>
                <Box marginLeft={50}>
                  <Typography variant="body2" color="text.secondary" paddingBottom={10} fontSize={15} sx={{ textAlign: 'left' }} paddingLeft={10}>
                    Cost Centre: {data?.cost_centre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paddingBottom={10} fontSize={15} textAlign={'left'} paddingLeft={10}>
                    Role: {data?.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paddingBottom={10} fontSize={15} textAlign={'left'} paddingLeft={10}>
                    Home Office: {data?.home_office}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={600}>
        <Grid item xs={4}>
          <Card sx={{ height: 400, width: 600, marginLeft: 50, marginTop: 60, backgroundColor: '#F7F5F5' }}>
            <CardHeader sx={{ paddingTop: 20, paddingBottom: 10 }} titleTypographyProps={{ sx: { fontSize: 17, textDecoration: 'underline' } }} title='Contact Details' />
            <CardContent>
              <Box display="flex" >
                <Box marginRight={2}>
                  <Avatar alt={userName} style={{ width: 60, height: 55, marginLeft: 25, marginTop: 10 }} {...stringAvatar(userName)} />
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary" paddingBottom={10} fontSize={15} textAlign={'left'} paddingLeft={10}>
                    Name: {data?.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paddingBottom={10} fontSize={15} textAlign={'left'} paddingLeft={10}>
                    Email Address: {data?.email}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paddingBottom={10} fontSize={15} textAlign={'left'} paddingLeft={10}>
                    Work Number: {data?.work_number}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Card sx={{ height: 400, width: 600, margin: 55, marginTop: 60, backgroundColor: '#F7F5F5' }}>
            <CardHeader sx={{ paddingTop: 20, paddingBottom: 10 }} titleTypographyProps={{ sx: { fontSize: 17, textDecoration: 'underline' } }} title='Organisation Details' />
            <CardContent >
              <Box display="flex" >
                <Box marginLeft={60}>
                  <Typography variant="body2" color="text.secondary" paddingBottom={10} fontSize={15} textAlign={'left'} paddingLeft={10}>
                    Grade: {data?.grade}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paddingBottom={10} fontSize={15} textAlign={'left'} paddingLeft={10}>
                    Team: {data?.team}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paddingBottom={10} fontSize={15} textAlign={'left'} paddingLeft={10}>
                    Performance Manager: {data?.manager}
                  </Typography>
                </Box>
                <Box marginLeft={50}>
                  <Typography variant="body2" color="text.secondary" paddingBottom={10} fontSize={15} sx={{ textAlign: 'left' }} paddingLeft={10}>
                    Cost Centre: {data?.cost_centre}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paddingBottom={10} fontSize={15} textAlign={'left'} paddingLeft={10}>
                    Role: {data?.role}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paddingBottom={10} fontSize={15} textAlign={'left'} paddingLeft={10}>
                    Home Office: {data?.home_office}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

    </>
  )
}

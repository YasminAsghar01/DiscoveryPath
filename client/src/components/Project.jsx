import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Divider } from "@mui/material";
import SideNav from './sideNav';
import { Element } from 'react-scroll';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import AvatarGroup from '@mui/material/AvatarGroup';
// import AvatarLabel from '@mui/material/AvatarLabel'
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';


function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

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



export default function Project() {


  const [data, setData] = React.useState(null);
  const { projectName } = useParams();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/projects/${projectName}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [projectName]);

  const headings = [
    { id: '1', text: 'Project Description' },
    { id: '2', text: 'Team Members' },
    { id: '3', text: 'Availability' },
    { id: '4', text: 'Learning Pathways' },
    { id: '5', text: 'Technologies' },
  ];
  console.log(data)

  return (
    <>
      {!data ? "Loading..." :
        <h1 style={{ fontWeight: 400, fontSize: 30, marginTop: 50 }}>{data.name}</h1>
      }

      <div style={{ display: 'flex', textAlign: 'left', paddingLeft: '10%' }}>
        <div style={{ flex: 1, padding: '20px' }}>
          {headings.map((heading) => (
            <div key={heading.id} id={heading.id}>
              <h2>{heading.text}</h2>
              <>
                {heading.text === 'Project Description' && data?.description ? <span>{data?.description}</span>
                  : null}
              </>
              <Stack direction="row" spacing={20}>
                {heading.text === 'Team Members' && data?.teamMembers
                  ? data?.teamMembers.map((test, index) => (
                    <Stack key={index} direction="column" alignItems="center">
                      <Avatar
                        alt={test.name}
                        style={{ width: 60, height: 54, marginBottom: 1 }}
                        {...stringAvatar(test.name)}
                      />
                      <Typography variant="caption">{test.name}</Typography>
                    </Stack>
                  ))
                  : null}
              </Stack>

              <>
                <div style={{ display: 'flex', flexDirection: 'row', gap: 16  }}>
                  {heading.text === 'Availability' && data?.openRoles && data.openRoles.length > 0
                    ? data?.openRoles.map((test, index) => (
                      <Card key={index} sx={{
                        maxWidth: 200, minWidth: 250, minHeight: 200, display: 'flex',
                        flexDirection: 'column', overflow: 'hidden'
                      }}>
                        <CardHeader sx={{ '& .MuiCardHeader-title': { fontSize: 17, paddingTop: 1, paddingBottom: 1, textDecoration: 'underline' } }} title={test.job_role} />
                        <CardContent sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          fontSize: '15px',
                          paddingTop: 1
                        }}>
                          <>
                            Requires knowledge in:
                            {test?.skill_requirement ? test?.skill_requirement.map((test1, index) => (
                              <span key={index}>
                                {test1}
                              </span>
                            )) : null}
                          </>
                          <div style={{
                            marginTop: 'auto', paddingTop: 15, display: 'flex',
                            justifyContent: 'center'
                          }}>
                            <p>{data?.project_lead ? `Contact ${data['project_lead']} for more information` : null}</p>
                          </div>
                        </CardContent>
                      </Card>
                    )) : null}
                </div>
              </>

              <>
                {heading.text === 'Availability' && data?.openRoles.length === 0 ? <p>No available roles</p>
                  : null}
              </>

              <>
                {heading.text === 'Learning Pathways' ? <p>No recommended pathways for this project</p>
                  : null}
              </>

              <>
                {heading.text === 'Technologies' && data?.technologies
                  ? data?.technologies.map((test, index) => (
                    <Chip
                      sx={{ backgroundColor: "#2D5592", color: "white", marginX: 5, marginBottom: 10, padding: 5 }}
                      label={test}
                      key={index} />
                  )) : null}
              </>

              <div style={{ margin: '40px 0' }} />
              <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
            </div>
            
          ))}
        </div>
        <SideNav headings={headings} />
      </div>
    </>
  )
}

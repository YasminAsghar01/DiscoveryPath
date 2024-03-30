import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Divider, IconButton } from "@mui/material";
import SideNav from './sideNav';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';

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
  const { pathwayName } = useParams();
  const navigate = useNavigate();
  const [data, setData] = React.useState(null);
  const [teamMemberNames, setTeamMemberNames] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/pathways/${pathwayName}`);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [pathwayName]);

  React.useEffect(() => {
    const fetchEmployeeData = async (userId) => {
      try {
        const response = await fetch(`/profiles/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        const employeeData = await response.json();
        return employeeData.name;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    const fetchTeamMemberNames = async () => {
      if (data?.completedUsers) {
        const names = await Promise.all(
          data?.completedUsers.map(async (memberId) => {
            const name = await fetchEmployeeData(memberId);
            return { name, memberId };
          })
        );
        setTeamMemberNames(names);
      }
    }; fetchTeamMemberNames()

  }, [data?.completedUsers]);

  const handleAvatarClick = (name, memberId) => { // Event handler for the "Make Reservation" button.
    window.scrollTo(0, 0); // Scroll to the top of the page.
    navigate(`/profiles/${memberId}`)
  }

  const headings = [
    { id: '1', text: 'Pathway Description' },
    { id: '2', text: 'Link to Pathway' },
    { id: '3', text: 'Skills Gained' },
    { id: '4', text: 'Certification' },
    { id: '5', text: 'Completed by' },
  ];

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
                {heading.text === 'Pathway Description' && data?.description ? <span>{data?.description}<br />{`\tThis will take ${data?.duration} to complete`}</span>
                  : null}
              </>
              <>
                {heading.text === 'Link to Pathway' && data?.link ? <a style={{
                  textDecoration: 'none', color: 'black',
                  fontWeight: 400,
                  transition: 'font-weight 0.3s',
                }}
                  onMouseOver={(e) => (e.target.style.color = 'rgb(45,93,154)')}
                  onMouseOut={(e) => (e.target.style.color = 'black')} target="_blank" rel="noreferrer" href={data?.link}>{data?.link}</a>
                  : null}
              </>
              <>
                {heading.text === 'Skills Gained' && data?.technologies
                  ? data?.technologies.map((test, index) => (
                    <Chip
                      sx={{ backgroundColor: "#2D5592", color: "white", marginX: 5, marginBottom: 10, padding: 5 }}
                      label={test}
                      key={index} />
                  )) : null}
              </>
              <>
                {heading.text === 'Certification' && data?.certification ? <span>{`By completing this pathway you can achieve the ${data?.certification} certification`}</span>
                  : null}
              </>
              <>
                {heading.text === 'Certification' && data?.certification === "" ? <span>{`There is currently no certification linked to this pathway`}</span>
                  : null}
              </>
              <Stack direction="row" spacing={20}>
                {heading.text === 'Completed by' && teamMemberNames
                  ? teamMemberNames?.map(({ name, memberId }, index) => (
                    <Stack key={index} direction="column" alignItems="center">
                      <IconButton
                        onClick={() => handleAvatarClick(name, memberId)}>
                        <Avatar
                          alt={name}
                          style={{ width: 60, height: 54, marginBottom: 1 }}
                          {...stringAvatar(name)}
                        />
                      </IconButton>
                      <Typography variant="caption">{name}</Typography>
                    </Stack>
                  ))
                  : null}
              </Stack>
              <>
                {heading.text === 'Completed by' && data?.completedUsers.length === 0 ? <span>{`No user has completed this pathway`}</span>
                  : null}
              </>
              <div style={{ margin: '50px 0' }} />
              <Divider sx={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />
            </div>
          ))}
        </div>
        <SideNav headings={headings} />
      </div>
    </>
  )
}

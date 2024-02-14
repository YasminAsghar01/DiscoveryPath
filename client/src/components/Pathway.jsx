import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Divider } from "@mui/material";
import SideNav from './sideNav';
import { Element } from 'react-scroll';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';

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


export default function Pathway() {

  const [data, setData] = React.useState(null);
  // Access the dynamic route parameter
  const { pathwayName } = useParams();

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

  const headings = [
    { id: '1', text: 'Pathway Description' },
    { id: '2', text: 'Link to Pathway' },
    { id: '3', text: 'Skills Gained' },
    { id: '4', text: 'Certification' },
    { id: '5', text: 'Completed by' },
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
                {heading.text === 'Pathway Description' && data?.description ? <span>{data?.description}<br/>{`\tThis will take ${data?.duration} to complete`}</span>
                  : null}
              </>
              <>
                {heading.text === 'Link to Pathway' && data?.link ? <a target="_blank" rel="noreferrer" href={data?.link}>{data?.link}</a>
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
                {heading.text === 'Completed by' && data?.completedUsers
                  ? data?.completedUsers.map((test, index) => (
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

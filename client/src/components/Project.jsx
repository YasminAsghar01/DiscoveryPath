import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import {
  Divider, IconButton, Avatar, Stack, Typography, Chip, Button, Card, CardHeader, CardContent,
  Dialog, DialogActions, DialogContent, DialogTitle, Box, TextField, Autocomplete
} from "@mui/material";
import SideNav from './sideNav';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

// from MUI documentation
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
  const { projectName } = useParams();
  const navigate = useNavigate();
  const [data, setData] = React.useState(null);
  const [employees, setEmployees] = React.useState(null);
  const [projectLeadName, setProjectLeadName] = React.useState(null);
  const [teamMemberNames, setTeamMemberNames] = React.useState([]);
  const [selectedEmployee, setSelectedEmployee] = React.useState(null);
  const [reloadTeamMembers, setReloadTeamMembers] = React.useState(false)

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.employeeId;

  // gets specific project information
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/projects/${projectName}`);
        const data = await response.json();
        setData(data);
        setReloadTeamMembers(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [projectName, reloadTeamMembers]);

  // gets all employee details
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/profiles`);
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // retrieves team members and project lead details
  React.useEffect(() => {
    const fetchEmployeeData = async (userId) => {
      try {
        const response = await fetch(`/profiles/${userId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch employee data');
        }
        const employeeData = await response.json();
        return employeeData?.name;
      } catch (error) {
        console.error(error);
        return null;
      }
    }
    const fetchTeamMemberNames = async () => {
      if (data?.teamMembers) {
        const names = await Promise.all(
          data?.teamMembers.map(async (memberId) => {
            const name = await fetchEmployeeData(memberId);
            return { name, memberId };
          })
        );
        setTeamMemberNames(names);
      }
    }
    const fetchProjectLeadName = async () => {
      const projectLead = await fetchEmployeeData(data?.project_lead)
      setProjectLeadName(projectLead)
    };
    fetchTeamMemberNames()
    fetchProjectLeadName()

  }, [data?.teamMembers, data?.project_lead]);

  const headings = [
    { id: '1', text: 'Project Description' },
    { id: '2', text: 'Team Members' },
    { id: '3', text: 'Availability' },
    { id: '4', text: 'Learning Pathways' },
    { id: '5', text: 'Technologies' },
  ];

  const handleAvatarClick = (memberId) => {
    window.scrollTo(0, 0);
    navigate(`/profiles/${memberId}`)
  }

  const handlePathwayClick = (name) => {
    window.scrollTo(0, 0);
    navigate(`/pathways/${name}`)
  }

  const [openTeamMember, setOpenTeamMember] = React.useState(false);

  const handleClickTeamMember = () => {
    setOpenTeamMember(true);
  };

  const handleCloseTeamMember = () => {
    setOpenTeamMember(false);
  };

  // checks that user has selected an employee and creates post request if employee not a team member
  const handleSubmitEmployee = async (event) => {
    if (selectedEmployee) {
      if (data?.teamMembers.includes(selectedEmployee?.employee_id) ||
        (data?.project_lead.includes(selectedEmployee?.employee_id))) {
        console.log('Already added')
        handleCloseTeamMember();
        return
      }
      try {
        const url = `http://localhost:3001/projects/${projectName}`;
        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ employee_id: selectedEmployee.employee_id }),
        });
        if (!response.ok) {
          throw new Error('Adding team member failed');
        }
        setReloadTeamMembers(true)
      } catch (error) {
        console.error('Adding team member failed:', error.message);
      }
    }
    handleCloseTeamMember();
  }

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
              {/* renders all team members using MUI Avatar which navigate to team members profile */}
              <Stack direction="row" spacing={20}>
                {heading.text === 'Team Members' && data?.project_lead && projectLeadName !== null
                  ?
                  <Stack direction="column" alignItems="center">
                    <IconButton
                      onClick={() => handleAvatarClick(data?.project_lead)}
                    >
                      <Avatar
                        alt={projectLeadName}
                        style={{ width: 60, height: 54, marginBottom: 1 }}
                        {...stringAvatar(projectLeadName)}
                      />
                    </IconButton>
                    <Typography variant="caption">{projectLeadName}</Typography>
                  </Stack>
                  : null}

                {heading.text === 'Team Members' && teamMemberNames
                  ? teamMemberNames?.map(({ name, memberId }, index) => (
                    <Stack key={index} direction="column" alignItems="center">
                      <IconButton
                        onClick={() => handleAvatarClick(memberId)}>
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

                {heading.text === 'Team Members' && userId === data?.project_lead &&
                  <Stack className="addMemberbutton" sx={{ '&hover': { backgroundColor: 'white' } }}>
                    <Button className="addMemberbutton"
                      sx={{
                        marginTop: 15,
                      }}
                      onClick={handleClickTeamMember}>
                      <AddOutlinedIcon sx={{ color: '#2D5592', fontSize: 30, backgroundColor: 'white' }} />
                    </Button>
                  </Stack>
                }
              </Stack>
              <>
              {/* shows card for available role and navigates to team chat with project lead if name clicked */}
                <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                  {heading.text === 'Availability' && data?.openRoles && data?.openRoles.length > 0
                    ? data?.openRoles.map((role, index) => (
                      <Card key={index} sx={{
                        maxWidth: 200, minWidth: 250, minHeight: 200, display: 'flex',
                        flexDirection: 'column', overflow: 'hidden'
                      }}>
                        <CardHeader sx={{ '& .MuiCardHeader-title': { fontSize: 17, paddingTop: 1, paddingBottom: 1, textDecoration: 'underline' } }} title={role.job_role} />
                        <CardContent sx={{
                          height: '100%',
                          display: 'flex',
                          flexDirection: 'column',
                          fontSize: '15px',
                          paddingTop: 1
                        }}>
                          <>
                            Requires knowledge in:
                            {role?.skill_requirement ? role?.skill_requirement.map((skill, index) => (
                              <span key={index}>
                                {skill}
                              </span>
                            )) : null}
                          </>
                          <div style={{
                            marginTop: 'auto', paddingTop: 15, display: 'flex',
                            justifyContent: 'center'
                          }}>
                            <p>{data?.project_lead ? <div> Contact <a style={{
                              textDecoration: 'none', color: 'black',
                              fontWeight: 500,
                              transition: 'font-weight 0.3s',
                            }}
                              onMouseOver={(e) => (e.target.style.color = 'rgb(45,93,154)')}
                              onMouseOut={(e) => (e.target.style.color = 'black')}
                              href={"https://teams.microsoft.com/l/chat/0/0?users=" + projectLeadName + "@testing.co.uk"} target="_blank" rel="noreferrer">
                              {projectLeadName} </a>  for more information </div> : null}</p>
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
              {/* shows card for each linked pathway which navigates to specific pathway page */}
                <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
                  {heading.text === 'Learning Pathways' && data?.recommended_pathway && data?.recommended_pathway.length > 0
                    ? data?.recommended_pathway.map((name, index) => (
                      <Card key={name} sx={{
                        maxWidth: 200, minWidth: 250, maxHeight: 150, display: 'flex',
                        flexDirection: 'column', overflow: 'hidden'
                      }}>
                        <IconButton sx={{
                          '&:hover': {
                            backgroundColor: 'white'
                          },
                        }}
                          onClick={() => handlePathwayClick(name)}>
                          <CardHeader sx={{
                            '& .MuiCardHeader-title': { fontSize: 17, paddingTop: 1, paddingBottom: 1, textDecoration: 'none', color: 'black' }, '&:hover': {
                              textDecoration: 'underline',
                              cursor: 'pointer',
                              color: 'rgb(45,93,154)'
                            },
                          }} title={name} />
                        </IconButton>
                      </Card>
                    )) : null}
                </div>
              </>
              <>
                {heading.text === 'Learning Pathways' && data?.recommended_pathway.length === 0 ? <p>No recommended pathways for this project</p>
                  : null}
              </>
              <>
                {heading.text === 'Technologies' && data?.technologies
                  ? data?.technologies.map((tech, index) => (
                    <Chip
                      sx={{ backgroundColor: "#2D5592", color: "white", marginX: 5, marginBottom: 10, padding: 5 }}
                      label={tech}
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
      {/* form which appears for project lead to add new team member */}
      <Dialog
        open={openTeamMember}
        onClose={handleCloseTeamMember}
      >
        <DialogTitle textAlign={'center'}>Add a new team member</DialogTitle>
        <DialogContent>
          <Autocomplete
            sx={{ width: 300 }}
            options={employees}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                {option.name}
                <br />
                {option.employee_id}
              </Box>
            )}
            onChange={(event, value) => setSelectedEmployee(value)}
            defaultValue={employees?.[0]}
            renderInput={(params) => (
              <TextField {...params} />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseTeamMember} >Cancel</Button>
          <Button onClick={handleSubmitEmployee} >Add</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

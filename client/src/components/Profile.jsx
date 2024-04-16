import * as React from 'react';
import { useParams } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Typography, Avatar, Box, Button, MenuItem, Alert } from "@mui/material";
import Grid from '@mui/material/Grid';
import { PieChart } from '@mui/x-charts/PieChart';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Tooltip from '@mui/material/Tooltip';
import { jwtDecode } from "jwt-decode";

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
  const { userId } = useParams();
  const [data, setData] = React.useState(null);
  const [openSkill, setOpenSkill] = React.useState(false);
  const [openProject, setOpenProject] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [reloadProjects, setReloadProjects] = React.useState(false)
  const [reloadSkills, setReloadSkills] = React.useState(false)
  const [skill, setSkill] = React.useState([]);

  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const employeeId = decodedToken.employeeId;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/profiles/${userId}`);
        const data = await response.json();
        setData(data);
        setReloadProjects(false)
        setReloadSkills(false)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [userId, reloadSkills, reloadProjects]);

  var skills = []
  if (data?.skills.length > 0) {
    data?.skills.map((skill) => {
      if (skill.proficiency_level === 'Beginner') {
        skills.push({ label: skill?.name, value: 1 })
      }
      if (skill.proficiency_level === 'Intermediate') {
        skills.push({ label: skill?.name, value: 2 })
      }
      if (skill.proficiency_level === 'Advanced') {
        skills.push({ label: skill?.name, value: 3 })
      }
    })
  }
  else {
    skills = [{ label: 'Outlook', value: 20 }]
  }

  const handleClickOpenSkill = () => {
    setOpenSkill(true);
  };

  const handleCloseSkill = () => {
    setOpenSkill(false);
  };

  const handleClickOpenProject = () => {
    setOpenProject(true);
  };

  const handleCloseProject = () => {
    setOpenProject(false);
  };

  const levels = [
    {
      value: 'Beginner',

    },
    {
      value: 'Intermediate',

    },
    {
      value: 'Advanced',

    },

  ];

  const handleSubmitSkill = async (event) => {
    const data = new FormData(event.currentTarget);
    const formData = {
      name: data.get('name'),
      level: data.get('level'),
    };
    console.log(JSON.stringify(formData))
    try {
      const url = `http://localhost:3001/profiles/${userId}/skills`;
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
        setSuccess(false)
        throw new Error('Adding skill failed');
      }
      setSuccess(true)
    } catch (error) {
      console.error('Adding skill failed:', error.message);
      setSuccess(false);
    }
  };




  const handleChange = (event) => {
    const input = event.target.value;
    const skillArray = input.split(',').map((s) => s.trim());
    setSkill(skillArray);
  };

  const handleSubmitProject = async (event) => {
    const data = new FormData(event.currentTarget);
    const formData = {
      name: data.get('name'),
      date: data.get('date').toString(),
      role: data.get('role'),
      skills: skill,
    };
    console.log(JSON.stringify(formData))
    try {
      const url = `http://localhost:3001/profiles/${userId}/experience`;
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
        throw new Error('Adding project experience failed');
      }
    } catch (error) {
      console.error('Adding project experience failed:', error.message);
    }
  };

  return (
    <>
      {!data ? "Loading..." :
        <h1 style={{ fontWeight: 400, fontSize: 30, marginTop: 50 }}>{data?.name}'s Profile</h1>
      }
      <Grid container spacing={600}>
        <Grid zIndex={2} item xs={4}>
          <Card sx={{ height: 175, width: 500, marginLeft: 100, marginTop: 20, backgroundColor: '#F7F5F5' }}>
            <CardHeader sx={{ paddingTop: 20, paddingBottom: 10 }} titleTypographyProps={{ sx: { fontSize: 17, textDecoration: 'underline' } }} title='Contact Details' />
            <CardContent>
              <Box display="flex" >
                <Box marginRight={2}>
                  {data?.name && <Avatar alt={data?.name} style={{ width: 60, height: 55, marginLeft: 25, marginTop: 10 }} {...stringAvatar(data?.name)} />}
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

        <Grid zIndex={1} item xs={8}>
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
                    Employee ID: {data?.employee_id}
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
            <CardHeader sx={{ paddingTop: 20, paddingBottom: 10 }} titleTypographyProps={{ sx: { fontSize: 17, textDecoration: 'underline' } }} title='My Skills' />
            <CardContent>
              <Box display="flex" >
                <PieChart
                  series={[
                    {
                      data: skills,
                      highlightScope: { faded: 'global', highlighted: 'item' },
                      faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                    },
                  ]}
                  width={500}
                  height={300}
                />
                {employeeId === userId &&
                  <Tooltip title="Add skill" arrow>
                    <Button className="addskillbutton" onClick={handleClickOpenSkill} style={{
                      marginLeft: -30, marginTop: -30, fontSize: 15, maxHeight: 35, minWidth: 50,
                    }}><AddBoxIcon sx={{ color: '#2D5592', marginRight: 5, fontSize: 35 }} /></Button>
                  </Tooltip>
                }
                <Dialog
                  open={openSkill}
                  onClose={handleCloseSkill}
                  PaperProps={{
                    component: 'form',
                    onSubmit: async (event) => {
                      event.preventDefault();
                      await handleSubmitSkill(event);
                      setReloadSkills(true)
                    },
                  }}
                >
                  <DialogTitle textAlign={'center'}>Add a new skill</DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      required
                      margin="dense"
                      id="name"
                      name="name"
                      label="Skill Name"
                      type="name"
                      fullWidth
                      variant="standard"
                    />
                    <TextField
                      autoFocus
                      defaultValue={'Beginner'}
                      margin="dense"
                      id="level"
                      name="level"
                      label="Proficiency Level"
                      select
                      fullWidth
                    >
                      {levels.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.value}
                        </MenuItem>
                      ))}
                    </TextField>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseSkill} > Cancel</Button>
                    <Button onClick={handleCloseSkill} type="submit">Save</Button>
                    {success && <Alert severity="success">This is a success Alert.</Alert>} {/* NOT WORKING */}
                  </DialogActions>
                </Dialog>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={8}>
          <Card sx={{ height: 400, width: 600, margin: 55, marginTop: 60, backgroundColor: '#F7F5F5', overflow: 'auto' }}>
            <CardHeader sx={{ paddingTop: 20, paddingBottom: 10 }} titleTypographyProps={{ sx: { fontSize: 17, textDecoration: 'underline' } }} title='Project Experience' />
            <Box display="flex" marginLeft={530} marginTop={-17} marginBottom={5} >
              {employeeId === userId &&
                <Tooltip title="Add project" arrow>
                  <Button className="addprojectbutton" onClick={handleClickOpenProject} style={{
                    marginLeft: -5, fontSize: 15, maxHeight: 35, minWidth: 50,

                  }}><AddBoxIcon sx={{ color: '#2D5592', marginRight: 5, fontSize: 35 }} /></Button>
                </Tooltip>
              }
            </Box>
            <Dialog
              open={openProject}
              onClose={handleCloseProject}
              PaperProps={{
                component: 'form',
                onSubmit: async (event) => {
                  event.preventDefault();
                  await handleSubmitProject(event);
                  setReloadProjects(true)
                },
              }}
            >
              <DialogTitle textAlign={'center'}>Add a new project experience</DialogTitle>
              <DialogContent>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="name"
                  name="name"
                  label="Project Name"
                  type="name"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="date"
                  name="date"
                  label="End Date"
                  type="date"
                  fullWidth
                  variant="standard"
                  InputLabelProps={{
                    shrink: true,
                    style: { marginTop: '5px' }
                  }}
                  InputProps={{ style: { marginTop: '15px' } }}
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="role"
                  name="role"
                  label="Role"
                  type="text"
                  fullWidth
                  variant="standard"
                />
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="skills"
                  name="skills"
                  label="Skills gained"
                  type="text"
                  fullWidth
                  variant="standard"
                  value={skill.join(', ')}
                  onChange={handleChange}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseProject}>Cancel</Button>
                <Button onClick={handleCloseProject} type="submit">Save</Button>
              </DialogActions>
            </Dialog>
            {data?.project_experience.map((option) => (
              <CardContent >
                <Card sx={{ height: 120, width: 500, marginLeft: 30, backgroundColor: 'white' }}>
                  <CardContent sx={{ textAlign: 'left' }}>
                    <Typography sx={{ fontSize: '15px' }}>Name: {option.name}</Typography>
                    <Typography sx={{ fontSize: '15px' }}>End date: {option.end_date}</Typography>
                    <Typography sx={{ fontSize: '15px' }}>Role: {option.role}</Typography>
                    <Typography sx={{ fontSize: '15px' }}>Skills gained: {option?.skills_gained.join(', ')}</Typography>
                  </CardContent>
                </Card>
              </CardContent>
            ))}
          </Card>
        </Grid>
      </Grid >
    </>
  )
}

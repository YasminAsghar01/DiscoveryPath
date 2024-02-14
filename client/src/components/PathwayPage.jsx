import React from "react";
import { Button, Grid, Container, ClickAwayListener, Grow, ButtonGroup, Popper, Paper, MenuItem, MenuList, Divider } from "@mui/material";
import PathwayCard from "./PathwayCard";
import { ArrowDropDown } from "@mui/icons-material";
import { Box, TextField, InputAdornment, IconButton } from '@mui/material'
import { Search } from '@mui/icons-material'
import FilterListIcon from '@mui/icons-material/FilterList';
import { useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import SearchBar from "./Searchbar";
import FilterDropdown from "./FilterDropdown";


const FilterMenu = () => {
  const names = [
    ['Languages', 'test', 'testt'],
    ['Libraries', 'test2'],
    ['Tools', 'test3'],
    ['Duration', 'test4'],
    ['Certification', 'test5'],
    ['Project', 'test5']
  ];

  const [state, setState] = React.useState({
    gilad: false,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { gilad, jason, antoine } = state;


  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuItemClick = (event, index, type = "null") => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClick = (event, index) => {
    setAnchorEl(event.currentTarget);
    setSelectedIndex(index);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup ref={anchorRef} aria-label="split button">
        <Button
          sx={{
            textTransform: "capitalize",
            color: "rgba(0, 0, 0, 0.7)",
            borderColor: "rgba(0, 0, 0, 0.4)",
            paddingY: 5,
            fontSize: 16,
            backgroundColor: "white",
            '&:hover': {
              borderColor: "rgba(0, 0, 0, 0.4)",
              cursor: 'default',
            },
          }}
        >
          <FilterListIcon sx={{ marginRight: 10 }} />
          Filters
        </Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{
            borderColor: "rgba(0, 0, 0, 0.4)", backgroundColor: "white", '&:hover': {
              borderColor: "rgba(0, 0, 0, 0.4)",
            },
          }}
        >
          <ArrowDropDown sx={{
            color: "rgba(0, 0, 0, 0.4)", backgroundColor: "white", '&:hover': {
              borderColor: "rgba(0, 0, 0, 0.4)",
            },
          }} />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
          height: 200,
          width: 250,

        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Paper sx={{ maxHeight: 250, overflow: "auto", padding: 5 }}>
              <ClickAwayListener onClickAway={handleClose}>
                <div>
                  {names.map((option, index) => (
                    <div>

                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          sx={{
                            flexDirection: 'row-reverse', // Change the direction to have the icon on the left
                            '& .MuiAccordionSummary-content': {
                              marginLeft: 0, // Adjust margin as needed
                            },
                          }}
                        >
                          <Typography>{option[0]}</Typography>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails>
                          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">

                            <FormGroup>

                              <FormControlLabel
                                control={
                                  <Checkbox checked={gilad} onChange={handleChange} name="gilad" />
                                }
                                label={option[1]}
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox checked={jason} onChange={handleChange} name="jason" />
                                }
                                label="Jason Killian"
                              />
                              <FormControlLabel
                                control={
                                  <Checkbox checked={antoine} onChange={handleChange} name="antoine" />
                                }
                                label="Antoine Llorca"
                              />
                            </FormGroup>
                          </FormControl>
                        </AccordionDetails>

                      </Accordion>
                    </div>
                  ))}
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

const Pathways = () => {

  const [data, setData] = React.useState(null);
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("All Pathways");

  const projectOptions = [
    "All Pathways",
    "Completed Pathways",
  ];

  React.useEffect(() => {
    const filtered = data?.filter((item) => {
      const match = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      if (selectedFilter === "Completed Pathways") {
        return match && item.completedUsers.length > 0;
      }
      return match;
    });
    setFilteredData(filtered);
  }, [searchQuery, data, selectedFilter]);

  const handleSearchQuery = (query) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (selectedOption) => {
    setSelectedFilter(selectedOption);

    if (selectedOption === "All Pathways") {
      setFilteredData(data);
    } else {
      const filtered = data?.filter((item) =>
        item.completedUsers.length > 0
      );
      setFilteredData(filtered);
    }
  };

  React.useEffect(() => {
    fetch("/pathways")
      .then((res) => res.json().then((data) => setData(data)))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);


  return (
    <>
      <h1 style={{ fontWeight: 400, fontSize: 30, marginBottom: 20, marginTop: 50 }}>Pathways</h1>
      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          backgroundColor: "#F7F5F5",
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          minHeight: '100vh',
          overflow: "auto",
          paddingTop: "20px",
          maxHeight: 'calc(100vh - 100px)',
          top: 0
        }}
      >
        <Box
          sx={{
            display: "flex",
            position: "sticky",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "flex-end",
            marginLeft: 30,
            marginTop: 20,
            paddingBottom: 30,
          }}
        >
          <div style={{ marginRight: 40 }}>
            <FilterDropdown options={projectOptions} onFilterChange={handleFilterChange} />
          </div>
          <div style={{ marginRight: 40 }}>
            <FilterMenu />
          </div>
          <SearchBar searchQuery={searchQuery} setSearchQuery={handleSearchQuery} />
        </Box>

        <Grid sx={{ overflow: 'auto', maxHeight: '100vh' }} container spacing={2}  >
          {!data ? "Loading..." : filteredData?.map((project, index) => (
            <Grid key={index} style={{ padding: "25px" }} item xs={12} sm={6} md={4} lg={3}>
              <PathwayCard cardcontent={project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  )
}

export default Pathways;

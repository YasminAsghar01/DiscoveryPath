import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import FilterListIcon from '@mui/icons-material/FilterList';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import Popper from '@mui/material/Popper';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Divider from '@mui/material/Divider';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// creates filter menu using options passed in
const FilterMenu = ({ options }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const [checkedStates, setCheckedStates] = React.useState({});

  // sets all the options to unchecked initially
  React.useEffect(() => {
    const initialCheckedStates = {};
    options.forEach((item) => {
      item.options.forEach((option) => {
        initialCheckedStates[option] = false;
      });
    });
    setCheckedStates(initialCheckedStates);
  }, []);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCheckboxChange = (event, name) => {
    setCheckedStates((prevState) => ({
      ...prevState,
      [name]: event.target.checked,
    }));
  };

  // creates dropdown with all the options which can be checked and unchecked
  return (
    <React.Fragment>
      <ButtonGroup ref={anchorRef} aria-label="split button">
        <Button
          sx={{
            textTransform: 'capitalize',
            color: 'rgba(0, 0, 0, 0.7)',
            borderColor: 'rgba(0, 0, 0, 0.4)',
            paddingY: 5,
            fontSize: 16,
            backgroundColor: 'white',
            '&:hover': {
              borderColor: 'rgba(0, 0, 0, 0.4)',
              cursor: 'default',
            },
          }}
        >
          <FilterListIcon sx={{ marginRight: 10 }} />
          Filters
        </Button>
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          sx={{
            borderColor: 'rgba(0, 0, 0, 0.4)', backgroundColor: 'white', '&:hover': {
              borderColor: 'rgba(0, 0, 0, 0.4)',
            },
          }}
        >
          <ArrowDropDown sx={{
            color: 'rgba(0, 0, 0, 0.4)', backgroundColor: 'white', '&:hover': {
              borderColor: 'rgba(0, 0, 0, 0.4)',
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
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper sx={{ maxHeight: 250, overflow: 'auto', padding: 5 }}>
              <ClickAwayListener onClickAway={() => setOpen(false)}>
                <div>
                  {options.map((item, index) => (
                    <div key={index}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          sx={{
                            flexDirection: 'row-reverse',
                            '& .MuiAccordionSummary-content': {
                              marginLeft: 0,
                            },
                          }}
                        >
                          <Typography>{item.heading}</Typography>
                        </AccordionSummary>
                        <Divider />
                        <AccordionDetails>
                          <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
                            <FormGroup>
                              {item.options.map((option, i) => (
                                <FormControlLabel
                                  key={i}
                                  control={
                                    <Checkbox
                                      checked={checkedStates[option]}
                                      onChange={(event) => handleCheckboxChange(event, option)}
                                      name={option}
                                    />
                                  }
                                  label={option}
                                />
                              ))}
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

export default FilterMenu;

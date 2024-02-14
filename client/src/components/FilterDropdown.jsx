import React from 'react';
import { Button, ClickAwayListener, Grow, ButtonGroup, Popper, Paper, MenuItem, MenuList } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";


const FilterDropdown = ({ options, onFilterChange }) => {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleMenuItemClick = (event, index, type = "null") => {
    setSelectedIndex(index);
    setOpen(false);
    onFilterChange(options[index]);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

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
          {options[selectedIndex]}
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
          height: 200
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
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option}
                      selected={index === selectedIndex}
                      onClick={(event) =>
                        handleMenuItemClick(event, index)
                      }
                      sx={{ textTransform: "capitalize" }}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
};

export default FilterDropdown;

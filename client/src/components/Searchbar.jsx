import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Search from '@mui/icons-material/Search';

// this component creates the search bar, allowing users to input their query
const SearchBar = ({ setSearchQuery }) => (
  <Box sx={{ marginRight: 20 }}>
    <TextField
      fullWidth
      InputProps={{
        endAdornment: (
          <>
            <InputAdornment position="end">
              <hr style={{
                height: "38px", width: 0, marginTop: 0, marginBottom: 0, borderLeft: 0,
                borderTop: 0, borderBottom: 0, borderColor: 'rgba(0, 0, 0, 0.4)'
              }} />
              <IconButton size="small" aria-label="search-button" sx={{ color: "rgba(0, 0, 0, 0.4)", borderRight: 'black', marginLeft: 4 }}>
                <Search sx={{ height: 18, width: 18 }} />
              </IconButton>
            </InputAdornment>
          </>
        ),
        sx: {
          backgroundColor: "white",
          width: 350,
          paddingRight: 5,
          color: 'rgba(0, 0, 0, 0.7)',
        },
      }}
      id="search-bar"
      className="text"
      onInput={(e) => {
        setSearchQuery(e.target.value);
      }}
      placeholder="Search..."
      size="small"
      sx={{ color: 'rgba(0, 0, 0, 0.7)' }}
    >
    </TextField>
  </Box>
);

export default SearchBar;

import React, { useState } from 'react';
import { TextField, IconButton, Grid, Button, Popover, MenuItem } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ExportIcon from '@mui/icons-material/IosShare';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';

const SearchComponent = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  filterTerm,
  onFilterChange,
  onFilterTermChange,
  onAddClick,
  addButtonName,
  addButtonClickHandler
}) => {

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFilterItemClick = (value) => {
    onFilterChange({ target: { value } });
    handleClose();
  };

  const exportToCSV = () => {
  };

  return (
    <Grid container spacing={2} alignItems="center" justifyContent="space-between">
      <Grid item xs>
        <TextField
          variant="outlined"
          placeholder="Search"
          fullWidth
          value={searchTerm}
          onChange={onSearchChange}
          InputProps={{
            endAdornment: (
              <IconButton>
                <SearchIcon />
              </IconButton>
            )
          }}
        />
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          startIcon={<ExportIcon />}
          onClick={exportToCSV}
          sx={{ mr: 1, border: 'none' }}
        >
          Export
        </Button>
        <Button onClick={handleClick} sx={{ mr: 1, fontSize: '14px' }}>
          <FilterListIcon />
          Add Filter
        </Button>
      </Grid>
      <Grid item>
        <Button
          sx={{ backgroundColor: '#030326', color: '#ffffff' }}
          startIcon={<AddIcon />}
          onClick={addButtonClickHandler}
          variant="outlined"
        >
          {addButtonName}
        </Button>
      </Grid>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => handleFilterItemClick('all')}>All</MenuItem>
        <MenuItem onClick={() => handleFilterItemClick('active')}>Active</MenuItem>
        <MenuItem onClick={() => handleFilterItemClick('inactive')}>Inactive</MenuItem>
      </Popover>
    </Grid>
  );
};

export default SearchComponent;

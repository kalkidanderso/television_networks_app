import React, { useState, useEffect } from 'react';
import { Box, Grid, Divider, Button } from '@mui/material';
import ViewDetailsModal from '../components/ViewDetailsModal';
import TableComponent from '../components/TableComponent';
import SearchComponent from '../components/SearchComponent';
import EditModal from '../components/EditModal';
import AddComponent from '../components/AddModal';
import {
  fetchMovies,
  fetchMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} from '../services/movieService';

const Program = () => {
  const [programData, setProgramData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTerm, setFilterTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editProgram, setEditProgram] = useState(null);
  const [viewProgram, setViewProgram] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Filtered and sorted data based on the search term, sort column, and sort order
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const movies = await fetchMovies();
      setProgramData(movies);
    };
    loadData();
  }, []);

  useEffect(() => {
    const filtered = programData
      .filter((program) =>
        program?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((program) =>
        filterStatus === 'all' ? true : program.status === (filterStatus === 'active')
      )
      .sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    setFilteredData(filtered);
  }, [programData, searchTerm, sortColumn, sortOrder, filterStatus]);

  const handleDeleteProgram = async (id) => {
    await deleteMovie(id);
    setProgramData(programData.filter((program) => program.id !== id));
  };

  const handleEditProgram = (id) => {
    const program = programData.find((prg) => prg.id === id);
    setEditProgram(program);
  };

  const handleSaveProgram = async (updatedProgram) => {
    const savedProgram = await updateMovie(updatedProgram.id, updatedProgram);
    setProgramData(programData.map((prg) => (prg.id === savedProgram.id ? savedProgram : prg)));
    setEditProgram(null);
  };

  const handleViewProgram = async (id) => {
    const program = await fetchMovieById(id);
    setViewProgram(program);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  const handleFilterTermChange = (event) => {
    setFilterTerm(event.target.value);
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleStatusChange = async (id) => {
    const program = programData.find((prg) => prg.id === id);
    const updatedProgram = { ...program, status: !program.status };
    const savedProgram = await updateMovie(id, updatedProgram);
    setProgramData(programData.map((prg) => (prg.id === savedProgram.id ? savedProgram : prg)));
  };

  const handleAddProgram = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveNewProgram = async (newProgram) => {
    const savedProgram = await createMovie({...newProgram, typeId: 1, channelId:1, categoryId: 1, videoUrl:"qwerty"});
    setProgramData([...programData, savedProgram]);
    setIsAddModalOpen(false);
  };

  const exportToCSV = () => {
    // Implement export logic here
  };

  const programColumns = [
    { id: 'title', label: 'Title' },
    { id: 'duration', label: 'Duration' },
    { id: 'description', label: 'Description' },
    { id: 'status', label: 'Status' },
  ];

  return (
    <Box
      container
      elevation={30}
      sx={{
        flexGrow: 1,
        p: 3,
        borderRadius: '10px',
        boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3)',
        fontFamily: 'Roboto, sans-serif',
        }}
        >
        <Grid container spacing={2} alignItems="center">
        <SearchComponent
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        filterStatus={filterStatus}
        filterTerm={filterTerm}
        onFilterChange={handleFilterChange}
        onFilterTermChange={handleFilterTermChange}
        addButtonName={'Add Program'}
        addButtonClickHandler={handleAddProgram}
        />
        </Grid>
        <Divider sx={{ my: 1 }} />
        <TableComponent
             data={filteredData}
             handleView={handleViewProgram}
             handleEdit={handleEditProgram}
             handleDelete={handleDeleteProgram}
             handleStatusChange={handleStatusChange}
             columns={programColumns}
             handleSort={handleSort}
             sortOrder={sortOrder}
             sortColumn={sortColumn}
           />
        {editProgram && (
        <EditModal
        open={Boolean(editProgram)}
        onClose={() => setEditProgram(null)}
        entity={editProgram}
        onSave={handleSaveProgram}
        />
        )}
        {viewProgram && (
        <ViewDetailsModal
        open={Boolean(viewProgram)}
        onClose={() => setViewProgram(null)}
        entity={viewProgram}
        />
        )}
       <AddComponent
  open={isAddModalOpen}
  onClose={handleCloseAddModal}
  onSave={handleSaveNewProgram}
  fields={[
    { name: 'title', label: 'Title' },
    { name: 'duration', label: 'Duration' },
    { name: 'description', label: 'Description' },
    { name: 'status', label: 'Status' },
  ]}
/>

</Box>
);
};

export default Program;


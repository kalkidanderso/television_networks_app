import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Divider } from '@mui/material';
import ViewDetailsModal from '../components/ViewDetailsModal';
import EditModal from '../components/EditModal';
import TableComponent from '../components/TableComponent';
import SearchComponent from '../components/SearchComponent';
import ExportIcon from '@mui/icons-material/IosShare';
import AddIcon from '@mui/icons-material/Add';
import AddComponent from '../components/AddModal';

// Import channel service functions
import {
  fetchChannels,
  createChannel,
  updateChannel,
  deleteChannel
} from '../services/channelService';

const Channel = () => {
  const [channelData, setChannelData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterTerm, setFilterTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editChannel, setEditChannel] = useState(null);
  const [viewChannel, setViewChannel] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Fetch channels on component mount
  useEffect(() => {
    fetchAllChannels();
  }, []);

  // Function to fetch all channels
  const fetchAllChannels = async () => {
    try {
      const channels = await fetchChannels();
      setChannelData(channels);
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  // Filtered and sorted data based on the search term, sort column, and sort order
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const filtered = channelData
      .filter((channel) =>
        channel.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((channel) =>
        filterStatus === 'all' ? true : channel.status === (filterStatus === 'active')
      )
      .sort((a, b) => {
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    setFilteredData(filtered);
  }, [channelData, searchTerm, sortColumn, sortOrder, filterStatus]);

  const handleDeleteChannel = async (id) => {
    try {
      await deleteChannel(id);
      setChannelData(channelData.filter((channel) => channel.id !== id));
    } catch (error) {
      console.error('Error deleting channel:', error);
    }
  };

  const handleEditChannel = (id) => {
    const channel = channelData.find((ch) => ch.id === id);
    setEditChannel(channel);
  };

  const handleSaveChannel = async (updatedChannel) => {
    try {
      const updated = await updateChannel(updatedChannel.id, updatedChannel);
      setChannelData(channelData.map((ch) => (ch.id === updated.id ? updated : ch)));
      setEditChannel(null);
    } catch (error) {
      console.error('Error updating channel:', error);
    }
  };

  const handleViewChannel = (id) => {
    const channel = channelData.find((ch) => ch.id === id);
    setViewChannel(channel);
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

  const handleStatusChange = async (id) => {
    try {
      const updatedChannel = channelData.find((ch) => ch.id === id);
      updatedChannel.status = !updatedChannel.status;
      await handleSaveChannel(updatedChannel);
    } catch (error) {
      console.error('Error changing channel status:', error);
    }
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleAddChannel = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false);
  };

  const handleSaveNewChannel = async (newChannel) => {
    try {
      const createdChannel = await createChannel(newChannel);
      setChannelData([...channelData, createdChannel]);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Error creating channel:', error);
    }
  };

  const channelColumns = [
    { id: 'name', label: 'Name' },
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
          addButtonName={"Add Channel" }
          addButtonClickHandler={handleAddChannel}
        />
      </Grid>
      <Divider sx={{ my: 1 }} />
      <TableComponent
        data={filteredData}
        handleView={handleViewChannel}
        handleEdit={handleEditChannel}
        handleDelete={handleDeleteChannel}
        handleStatusChange={handleStatusChange}
        columns={channelColumns}
        handleSort={handleSort}
        sortOrder={sortOrder}
        sortColumn={sortColumn}
      />
      {editChannel && (
        <EditModal
          open={Boolean(editChannel)}
          onClose={() => setEditChannel(null)}
          entity={editChannel}
          onSave={handleSaveChannel}
        />
      )}
      {viewChannel && (
        <ViewDetailsModal
          open={Boolean(viewChannel)}
          onClose={() => setViewChannel(null)}
          entity={viewChannel}
        />
      )}
      <AddComponent
        open={isAddModalOpen}
        onClose={handleCloseAddModal}
        onSave={handleSaveNewChannel}
        fields={[
          { name: 'name', label: 'Name' },
          { name: 'status', label: 'Status' },
        ]}
      />
    </Box>
  );
};

export default Channel;

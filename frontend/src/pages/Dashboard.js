import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, IconButton, Divider, TextField, Button } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import SearchIcon from '@mui/icons-material/Search';
import ExportIcon from '@mui/icons-material/IosShare';
import FilterListIcon from '@mui/icons-material/FilterList';
import SystemUserIcon from '@mui/icons-material/Group';
import ProgramIcon from '@mui/icons-material/Category';
import ChannelIcon from '@mui/icons-material/Tv';

// Import service functions
import { fetchUsers, fetchUserGrowth } from '../services/userService';
import { fetchChannels, fetchChannelGrowth } from '../services/channelService';
import { fetchMovies, fetchMovieByCategories, fetchProgramGrowth, fetchMovieByType } from '../services/movieService';

// Chart.register(ArcElement, Tooltip, Legend);

import { Line } from 'react-chartjs-2';
import { Card, CardContent } from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);


const iconStyle = { fontSize: 40, backgroundColor: '#030326', color: '#fff', borderRadius: '6px', padding: '6px' };

const chartColors = ['#008000', '#0bb80b', '#800080', '#0000FF', '#eb3897']; // Green, bright green, purple, blue, and pink

const DashboardComponent = () => {
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [categoryData, setCategoryData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: chartColors,
      hoverBackgroundColor: chartColors,
      borderWidth: 1,
      cutout: '70%', // Adjust the thickness here
    }],
  });

  const [typeData, setTypeData] = useState({
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: chartColors,
      hoverBackgroundColor: chartColors,
      borderWidth: 1,
      cutout: '70%', // Adjust the thickness here
    }],
  });
  const [usersGrowth, setUsersGrowth] = useState('');
  const [programsGrowth, setProgramsGrowth] = useState('');
  const [channelsGrowth, setChannelsGrowth] = useState('');


  useEffect(() => {
    fetchAllUsers();
    fetchAllChannels();
    fetchAllPrograms();
    fetchMoviesByCategories();
    fetchMoviesByType();
    fetchGrowthData();

  }, []);
 

  const dataa = {
    labels: ['MON', 'TUE', 'WED', 'THUR', 'FRI', 'SAT', 'SUN'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [30, 40, 45, 50, 35, 40, 45],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Dataset 2',
        data: [20, 30, 40, 35, 25, 30, 35],
        borderColor: 'rgb(54, 162, 235)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
      },
      {
        label: 'Dataset 3',
        data: [40, 50, 35, 45, 30, 35, 40],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      },
      {
        label: 'Dataset 4',
        data: [10, 20, 25, 30, 20, 25, 30],
        borderColor: 'rgb(255, 206, 86)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
      },
    ],
  };
  

  const fetchAllUsers = async () => {
    try {
      const usersData = await fetchUsers();
      setUsers(usersData);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  const fetchGrowthData = async () => {
    try {
      const usersGrowthResponse = await fetchUserGrowth();
      const usersPercentageGrowth = calculatePercentageGrowth(usersGrowthResponse.usersCurrentMonth, usersGrowthResponse.usersPreviousMonth);
      setUsersGrowth(usersPercentageGrowth);
  
      const programsGrowthResponse = await fetchProgramGrowth();
      const programsPercentageGrowth = calculatePercentageGrowth(programsGrowthResponse.programsCurrentMonth, programsGrowthResponse.programsPreviousMonth);
      setProgramsGrowth(programsPercentageGrowth);
  
      const channelsGrowthResponse = await fetchChannelGrowth();
      const channelsPercentageGrowth = calculatePercentageGrowth(channelsGrowthResponse.channelsCurrentMonth, channelsGrowthResponse.channelsPreviousMonth);
      setChannelsGrowth(channelsPercentageGrowth);
    } catch (error) {
      console.error('Error fetching growth data:', error);
      // Handle error gracefully, such as displaying an error message to the user
    }
  };
  
  const calculatePercentageGrowth = (currentMonthCount, previousMonthCount) => {
    const total = currentMonthCount + previousMonthCount;
    const percentageGrowth = (currentMonthCount  / total) * 100;
    return `+${percentageGrowth.toFixed(0)}% This Month`;
  };
  
  

  const fetchAllChannels = async () => {
    try {
      const channelsData = await fetchChannels();
      setChannels(channelsData);
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  const fetchAllPrograms = async () => {
    try {
      const programsData = await fetchMovies();
      setPrograms(programsData);
    } catch (error) {
      console.error('Error fetching programs:', error);
    }
  };

  const fetchMoviesByCategories = async () => {
    try {
      const categoriesData = await fetchMovieByCategories();
      const labels = categoriesData.map(category => category.name);
      const data = categoriesData.map(category => category.movieCount);
      setCategoryData(prevData => ({
        ...prevData,
        labels,
        datasets: [{
          ...prevData.datasets[0],
          data,
        }],
      }));
    } catch (error) {
      console.error('Error fetching movies by categories:', error);
    }
  };

  const fetchMoviesByType = async () => {
    try {
      const typeData = await fetchMovieByType();
      const labels = typeData.map(type => type.name);
      const data = typeData.map(type => type.movieCount);
      setTypeData(prevData => ({
        ...prevData,
        labels,
        datasets: [{
          ...prevData.datasets[0],
          data,
        }],
      }));
    } catch (error) {
      console.error('Error fetching movies by type:', error);
    }
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    layout: {
      padding: {
        left: 10,
        right: 10,
        top: 10,
        bottom: 10,
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };



  const optionss = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  

  return (
    <Box
      container
      elevation={30}
      sx={{
        flexGrow: 1,
        p: 3,
        borderRadius: '10px',
        boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3)', // Increased shadow intensity
        fontFamily: 'Roboto, sans-serif'
      }}
    >
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={6} md={8}>
          <TextField
            variant="outlined"
            placeholder="Search"
            fullWidth
            InputProps={{
              endAdornment: (
                <IconButton>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4} container justifyContent="flex-end">
          <Button
            variant="outlined"
            startIcon={<ExportIcon />}
            sx={{ mr: 1 }}
          >
            Export
          </Button>
          <Button
            variant="outlined"
            startIcon={<FilterListIcon />}
            sx={{ mr: 1 }}
          >
            Add Filter
          </Button>
        </Grid>
      </Grid>
      <Divider sx={{ my: 2 }} />
      <Grid container spacing={2}>
      {[
            { label: 'System User', count: users.length, icon: <SystemUserIcon sx={iconStyle} />, growth: usersGrowth },
            { label: 'Program', count: programs.length, icon: <ProgramIcon sx={iconStyle} />, growth: programsGrowth },
            { label: 'Channel', count: channels.length, icon: <ChannelIcon sx={iconStyle} />, growth: channelsGrowth },
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={3} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f5f5f5', borderRadius: '10px' }}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>{item.label}</Typography>
                  <Typography variant="h4" sx={{ color: '#333' }}>{item.count}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {item.growth}
                  </Typography>
                </Box>
                <Box sx={{ fontSize: 40 }}>
                  {item.icon}
                </Box>
              </Paper>
            </Grid>
          ))}

      </Grid>
     
      <Box sx={{ mt: 10, width: '100%' }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: '10px' }}>
          <Box
            position={'relative'}
            sx={{
              mb: 1,
              bgcolor: 'black',
              borderRadius: '8px',
              width: 'fit-content',
              height: 'fit-content',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', p: 1 }}>
              Program on Category
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  height: 300,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: 'background.paper',
                  position: 'relative',
                }}
              >
                <Doughnut data={categoryData} options={options} />
                <Typography
                  variant="h6"
                  sx={{
                    position: 'absolute',
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#333',
                  }}
                >
                  Movies by Category
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {categoryData.labels.map((label, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        bgcolor: chartColors[index % chartColors.length],
                        borderRadius: '50%',
                      }}
                    />
                    <Typography variant="body1" color="textPrimary" sx={{ fontWeight: 'bold' }}>
                      {label}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {categoryData.datasets[0].data[index]}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>







      <Box sx={{ mt: 10, width: '100%' }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: '10px' }}>
          <Box
            position={'relative'}
            sx={{
              mb: 1,
              bgcolor: 'black',
              borderRadius: '8px',
              width: 'fit-content',
              height: 'fit-content',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'white', p: 1 }}>
              Program on Type
            </Typography>
          </Box>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6}>
              <Box
                sx={{
                  height: 300,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  bgcolor: 'background.paper',
                  position: 'relative',
                }}
              >
                {/* <Doughnut data={typeData} options={options} /> */}
              
              <Line data={dataa} options={optionss} />
         
                {/* <Typography
                  variant="h6"
                  sx={{
                    position: 'absolute',
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: '#333',
                  }}
                >
                  Movies by Type
                </Typography> */}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {typeData.labels.map((label, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        bgcolor: chartColors[index % chartColors.length],
                        borderRadius: '50%',
                      }}
                    />
                    <Typography variant="body1" color="textPrimary" sx={{ fontWeight: 'bold' }}>
                      {label}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {typeData.datasets[0].data[index]}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
};

export default DashboardComponent;

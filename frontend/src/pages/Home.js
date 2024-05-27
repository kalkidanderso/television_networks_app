import React from 'react';
import Layout from '../components/Layout';
import { Typography } from '@mui/material';

const Home = () => {
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Welcome to Television Networks App
      </Typography>
      <Typography variant="body1">
        This is the home page. You can navigate to different sections using the navigation bar above.
      </Typography>
    </Layout>
  );
}

export default Home;

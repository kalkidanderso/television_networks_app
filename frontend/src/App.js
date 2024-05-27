import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Channel from './pages/Channel';
import {Program} from './pages/Program';

function App() {

  return (
    <Router>
      <Layout>
       
      </Layout>
    </Router>
  );
}

export default App
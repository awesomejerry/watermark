import React from 'react';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Watermark from './Watermark';

function App() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Node Gathering Cover</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm">
        <Watermark />
      </Container>
    </div>
  );
}

export default App;

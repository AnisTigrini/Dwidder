import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BasicForm from './basicForm';
import Information from './information';


export default function BasicGrid() {
  return (
    <Box sx={{ flexGrow: 1, padding: "10px" }}>
      <Grid container spacing={2}>
        
        <Grid item md={4} xs={12}>
          <BasicForm></BasicForm>
        </Grid>
        
        <Grid item md={8} xs={12}>
          <Information></Information>
        </Grid>
      </Grid>
    </Box>
  );
}

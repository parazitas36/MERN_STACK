import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

const Footer = () => {
  return (
    <AppBar position='relative' color="primary">
      <Toolbar>
        <Typography variant="caption">
            &copy; 2023, MERN E-SHOP
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Footer
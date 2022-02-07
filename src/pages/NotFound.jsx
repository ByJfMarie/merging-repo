import React from 'react';
import { Typography, Button } from '@mui/material';

export default function NotFound() {

    return(<>
        <Typography variant="h1"> 404 Error </Typography>
        <Typography variant="h3"> Page Not Found </Typography>
        <Button href="/"> Return to Home Page </Button>
    </>)

}
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


interface NavigationHeaderProps {
    onClick?: () => void;
}

export function NavigationHeader({onClick} : NavigationHeaderProps) {


    return (
        <>
            <Grid 
                item
                xl={8} 
                lg={8} 
                md={8} 
                sm={8} 
                xs={8} 
            >
                <h3 style={{float:"left", paddingLeft:"2%", }}>Navigation</h3>
            </Grid>

            <Grid 
                item
                xl={2} 
                lg={2} 
                md={2} 
                sm={2} 
                xs={2} 
                style={{margin: "auto"}}
            >
                <Button onClick={onClick} variant="outlined" style={{float:"right", border: "1px solid #E5E8EB", borderRadius: "16px", color:"#33445C", textTransform:"none",}}>
                    <ArrowBackIcon/>
                </Button>
            </Grid> 

        </>
    )
}
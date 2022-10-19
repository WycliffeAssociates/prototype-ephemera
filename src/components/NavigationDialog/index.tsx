import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

function NavigationDialog() {

    return (
        <>
            <div>
            <Button variant="outlined" onClick={() => console.log("add handle open here")}>
                Slide in alert dialog
            </Button>
            <Dialog
                open={true}
                keepMounted
                onClose={() => console.log("add handle close here")}
                aria-describedby="alert-dialog-slide-description"
                fullWidth={true}
                maxWidth={"md"}
            >
                <DialogContent>
                    <Grid   container
                            direction="row"
                            justifyContent="center"
                            alignItems="stretch">
                        <Grid item>
                  
                        </Grid>
                        <Grid item>
                        
                        </Grid>

                    </Grid>
                </DialogContent>
                {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => console.log("add handle close here")}>Disagree</Button>
                    <Button onClick={() => console.log("add handle close here")}>Agree</Button>
                </DialogActions> */}
            </Dialog>
            </div>
        </>
    )
}




export default NavigationDialog;
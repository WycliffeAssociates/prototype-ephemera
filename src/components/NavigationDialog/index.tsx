import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import BookChapterMenu from "./utils/BookChapterMenu";


interface NavigationDialogProps {
    open: boolean;
    onClose: (params: any) => any;
    fullScreen: boolean;
}

function NavigationDialog({open, onClose, fullScreen} : NavigationDialogProps) {

    return (
        <>
            <div>
                <Dialog
                    open={open}
                    keepMounted
                    onClose={onClose}
                    aria-describedby="alert-dialog-slide-description"
                    fullScreen={fullScreen}
                    fullWidth={true}
                    maxWidth={"md"}
                    
                >
                    <DialogContent 
                        style={{
                            padding:"0px", 
                            width:"100%", 
                            overflowY: "hidden", 
                            height:"100%"
                        }}
                    >
                        <Grid   
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="stretch"
                            style={{margin:"0px"}}
                            spacing={0}
                        >
                            <BookChapterMenu withClickableOptions={fullScreen}/>
                        </Grid>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    )
}

export default NavigationDialog;
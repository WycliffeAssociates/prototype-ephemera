import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import BookChapterMenu from "./utils/BookChapterMenu";


interface NavigationModalProps {
    open: boolean;
    onClose: (params: any) => any;
    fullScreen: boolean;
}

function NavigationModal({open, onClose, fullScreen} : NavigationModalProps) {
    
    // TODO: add this to its own style file after testing styles
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: fullScreen ? "100%" : "70%",
        height: fullScreen ? "100%" : "70%",
        maxHeight: fullScreen ? "100%" : "70%",
        background: "#FFFFFF",
        borderRadius: "8px",
        boxShadow: 24,
        p: 1,
        paddingTop: "0px",
        paddingLeft:"0px",
        outline: 'none',
    };


    return (
        <>
            <Modal  
                    open={open}         
                    onClose={() => onClose(undefined)}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    hideBackdrop={true}
            >
                <div>
                    <Box sx={style}>
                        <Grid   
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="stretch"
                            style={{margin:"0px", height:"95%"}}
                            spacing={0}
                        >
                            <Grid item xs={12} sm={12} md={0} lg={0} style={{padding: "8px 16px",}}>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ mr: 2 }}
                                    style={{margin:"0px", paddingLeft:"4px", paddingRight:"0px", height:"40px", width:"40px"}}
                                    onClick={onClose}
                                >
                                    <CloseIcon style={{margin:"0px"}}/>
                                </IconButton>
                                <span className="NavigationModal__navigation">Navigation</span>
                            </Grid>
                            <BookChapterMenu withClickableOptions={fullScreen}/>
                        </Grid>
                    </Box>
                </div>
            </Modal>
        </>
    )
}

export default NavigationModal;
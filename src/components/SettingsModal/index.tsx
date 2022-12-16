import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import {SettingsOption} from '../../types';
import Options from './utils/Options';

const style = {
    position: 'absolute' as 'absolute',
    top: '32%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "40%",
    height: "40%",
    background: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: 24,
    p: 1,
    paddingTop: "0px",
    paddingLeft:"0px",
    outline: 'none'
};

interface SettingsModalProps {
    open: boolean;
    onClose: () => any;
    settings: SettingsOption[];
}

function SettingsModal({open, onClose, settings} : SettingsModalProps) {

    return (
        <Modal open={open}         
            onClose={() => onClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            hideBackdrop={true}> 
            <Box sx={style} style={{minWidth:"225px"}}>
                <Grid container direction="row">
                    <Grid item lg={2} xl={2} md={2} sm={2} xs={2}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            style={{margin:"0px", paddingLeft:"4px", paddingRight:"0px", height:"40px", width:"40px"}}
                            onClick={() => onClose()}
                        >
                            <CloseIcon style={{margin:"0px"}}/>
                        </IconButton>
                    </Grid>
                    <Grid item lg={10} xl={10} md={10} sm={10}  xs={10}>
                        <p className="SettingsModal__settingsHeader">Settings</p>
                    </Grid>

                    <Options settings={settings}/>
                </Grid>
            </Box>
        </Modal>
    )
}
export default SettingsModal;
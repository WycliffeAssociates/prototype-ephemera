import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import {SettingsOption} from '../types';

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

const SettingsModal__decreaseButton = {
    height:"30px", 
    width:"30px", 
    maxHeight:"30px", 
    maxWidth:"30px", 
    minWidth:"30px",
}

const SettingsModal__increaseButton = {
    height:"30px", 
    width:"30px", 
    maxHeight:"30px", 
    maxWidth:"30px", 
    minWidth:"30px", 
}


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

                    <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                        <>
                            {settings.map((setting) => {
                                return <span className="SettingsModal__settingsOption">{setting.name}</span> 
                            })}
                        </>
                    </Grid>
                    <Grid item lg={6} xl={6} md={6} sm={6} xs={6}>
                        <Grid container direction="row">
                            {settings.map((setting) => {
                                if(setting.type == "switch") {
                                    return (
                                        <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
                                            <Switch defaultChecked size='medium'/>
                                        </Grid>
                                    );
                                } else {
                                    return (
                                        <Grid item lg={12} xl={12} md={12} sm={12} xs={12}>
                                            <Button 
                                                variant="outlined" 
                                                sx={{m: .25, p: .25}} 
                                                style={SettingsModal__decreaseButton}
                                                onClick={() => {setting.modifier((setting.value as number) - 1);}}
                                            >-</Button>
                                            <p className="SettingsModal__settingsValue">{setting.value}{setting.unit ? setting.unit : ""}</p>
                                            <Button 
                                                variant="outlined" 
                                                sx={{m: .25, p: .25}} 
                                                style={{...SettingsModal__increaseButton, float:"right"}}
                                                onClick={() => {setting.modifier((setting.value as number) + 1);}}
                                            >+</Button>
                                        </Grid>
                                    )
                                }
                                
                            })}

                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}
export default SettingsModal;
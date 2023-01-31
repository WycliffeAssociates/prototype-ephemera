import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/base/ClickAwayListener';
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

    function setAllSettingsToDefault() {
        settings.forEach((setting) => {
            setting.modifier(setting.defaultValue);
        })
    }

    return (
        <Modal open={open}         
            onClose={() => onClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            hideBackdrop={true}> 
            <div>
                <ClickAwayListener onClickAway={() => onClose()}>
                    <Box sx={style} style={{minWidth:"225px", minHeight: "245px", maxHeight: "250px"}}>
                        <Grid container direction="row" justifyContent="center">
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

                            <Grid item lg={4} xl={4} md={4} sm={4} xs={4}>
                                <Button 
                                    variant="outlined" 
                                    sx={{m: .25, p: .25}} 
                                    style={{ width:"90%", height:"25px"}}
                                    onClick={setAllSettingsToDefault}
                                >reset</Button>
                            </Grid>
                        </Grid>
                    </Box> 
                </ClickAwayListener>
            </div>
            
            {/* <Box sx={style} style={{minWidth:"225px", minHeight: "245px", maxHeight: "250px"}}>
                <Grid container direction="row" justifyContent="center">
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

                    <Grid item lg={4} xl={4} md={4} sm={4} xs={4}>
                        <Button 
                            variant="outlined" 
                            sx={{m: .25, p: .25}} 
                            style={{ width:"90%", height:"25px"}}
                            onClick={setAllSettingsToDefault}
                        >reset</Button>
                    </Grid>
                </Grid>
            </Box> */}
        </Modal>
    )
}
export default SettingsModal;
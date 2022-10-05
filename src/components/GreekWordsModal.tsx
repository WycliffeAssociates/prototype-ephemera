import {useState} from 'react';
import Modal from '@mui/material/Modal';
import GreekWordInfo from './GreekWordInfo';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { FormattedGreekWord } from '../types';
import GreekWordsDialog from './GreekWordsDialog';



const style = {
    position: 'absolute' as 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "90%",
    height: "70%",
    background: "#FFFFFF",
    borderRadius: "8px",
    boxShadow: 24,
    p: 1,
    paddingTop: "0px",
    paddingLeft:"0px",
    outline: 'none'
};


interface GreekWordsModalProps {
    greekWords : FormattedGreekWord[];
    open: boolean;
    onClose: () => any;
}

function GreekWordsModal({greekWords, open, onClose} : GreekWordsModalProps) {

    return (
        <Modal open={open}         
            onClose={() => onClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            hideBackdrop={true}> 
            <Box sx={style}>
                <Grid container direction="row" style={{paddingTop: "8px", height:"100%",}}>
                    <Grid item lg={1} xl={1} md={1} sm={1} xs={1} style={{height:"100%"}}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                            style={{margin:"0px", paddingLeft:"4px", paddingRight:"0px", height:"40px", width:"40px"}}
                            onClick={() => onClose()}
                        >
                            <KeyboardArrowRightIcon style={{margin:"0px"}}/>
                        </IconButton>
                    </Grid>

                    <Grid item lg={10} xl={10} md={10} sm={10}  xs={10} style={{maxHeight: '89vh',overflowY: "auto", height:"100%"}}>

                        {greekWords.map((data, idx) => (
                            <GreekWordInfo key={idx} currentGreekWord={data}/>
                        ))}
                    
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    )
}


export default GreekWordsModal;
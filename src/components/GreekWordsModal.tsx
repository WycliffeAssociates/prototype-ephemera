import {useState} from 'react';
import Modal from '@mui/material/Modal';
import GreekWordInfo from './GreekWordInfo';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { FormattedGreekWord } from '../types';



const style = {
    position: 'absolute' as 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 300,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 1,
    paddingTop: "0px",
    paddingLeft:"0px",
    overflow: "hidden",
    overflowY: "scroll",
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
            <Grid container spacing={0} direction="row" style={{padding:"0px"}}>
                <Grid item xs={1} sm={1} md={1}>
                    <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                    style={{margin:"0px", paddingLeft:"0px", paddingRight:"0px", marginTop: "8px", height:"30px", width:"30px"}}
                    onClick={() => onClose()}
                    >
                    <KeyboardArrowRightIcon style={{margin:"0px"}}/>

                    </IconButton>
                </Grid>
                <Grid item xs={11} sm={11} md={11}>
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
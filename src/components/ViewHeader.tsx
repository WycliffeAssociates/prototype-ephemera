import { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import SettingsIcon from '@material-ui/icons/Settings';
import LanguageIcon from '@material-ui/icons/Language';
import SettingsModal from './SettingsModal';
import { useSettings } from '../hooks/SettingsContext';


interface ViewHeaderProps {
    showIconText: boolean;
}

export function ViewHeader({ showIconText }: ViewHeaderProps) {

    const [settingsModalOpen, setSettingsModalOpen] = useState(false);
    const {ULBSettings, GWTSettings,} = useSettings();


    const onSettingsModalClose = () => {
        setSettingsModalOpen(false);
    }

    const onSettingsModalOpen = () => {
        setSettingsModalOpen(true);
      }

    return (
        <>
                <Grid 
                    item
                    xl={8} lg={8} md={8} sm={8} xs={8} 
                >
                    <h3 style={{float:"left", paddingLeft:"2%", }}>Greek Lexicon</h3>
                </Grid>

                <Grid 
                    item
                    xl={2} lg={2} md={2} sm={2} xs={2} 
                    style={{margin: "auto"}}
                >
                    <Button onClick={() => onSettingsModalOpen()} variant="outlined" style={{float:"right", border: "1px solid #E5E8EB", borderRadius: "16px", color:"#33445C", textTransform:"none",}}>
                        <SettingsIcon/>
                        {showIconText === true ? "Settings" : ""}
                    </Button>
                </Grid> 

                <Grid 
                    item
                    xl={2} lg={2} md={2} sm={2} xs={2} 
                    style={{margin: "auto"}}
                >
                    <Button variant="outlined" style={{float:"left", border: "1px solid #E5E8EB", borderRadius: "16px", color:"#33445C", textTransform:"none"}}>
                        <LanguageIcon/>
                        { showIconText === true ? "Go to BIEL" : "" }  
                    </Button>
                </Grid> 

                <SettingsModal
                    open={settingsModalOpen} 
                    onClose={onSettingsModalClose} 
                    settings={[...ULBSettings, ...GWTSettings]}
                />
        </>
    )
}
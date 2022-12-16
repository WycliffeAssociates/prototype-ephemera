import Grid from '@mui/material/Grid';
import {SettingsOption} from '../../../types';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';

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

interface OptionsProps {
    settings: SettingsOption[];
}

function Options({settings} : OptionsProps) {
    return (
        <>
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
    </>
    )
}

export default Options;
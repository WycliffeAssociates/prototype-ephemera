import Grid from '@mui/material/Grid';
import { useSettings } from '../../../hooks/SettingsContext';
import { mapValidGWTSettings } from './mapValidGWTSettings';

interface greekWordProps {
    greekWord: string | undefined,
};

function GreekWord({greekWord} : greekWordProps) {
    const { GWTSettings } = useSettings();
    let overwriteStyle : any = mapValidGWTSettings(GWTSettings);

    return (
        <>
            <Grid item sm={12} xs={12}>
                <p 
                    style={{color:"blue"}}
                    className="GreekWord"
                >{greekWord}</p> 
            </Grid>
        </>
    )
}


export default GreekWord;

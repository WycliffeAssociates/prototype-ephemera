import { Button, Divider, Grid } from "@mui/material";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useSettings } from '../../../hooks/SettingsContext';
import { mapValidGWTSettings } from '../../InformationPanel/GreekWordInfo/utils/mapValidGWTSettings';


interface HeaderProps {
    onClose: () => any;
    show: boolean;
}

export function Header( { onClose, show } : HeaderProps) {
    const { GWTSettings } = useSettings();
    let overwriteStyle : any = mapValidGWTSettings(GWTSettings);

    if(show === false) {
        return <></>
    }
    
    return ( 
        <>
            <Grid 
                item
                xl={8} lg={8} md={8} sm={8} xs={8}
            >
                <h3 style={{...overwriteStyle}} className="BannerHeader">Greek Word Translation</h3>
            </Grid>

            <Grid 
                item xl={2} lg={2} md={2} sm={2} xs={2} 
                style={{margin: "auto",}}
            >
                <Button 
                        onClick={onClose} 
                        variant="outlined" 
                        style={{
                                    float:"right", 
                                    border: "1px solid #E5E8EB", 
                                    borderRadius: "16px", 
                                    color:"#33445C", 
                                    textTransform:"none",
                                }}
                >
                    <ArrowBackIcon/>
                </Button>
            </Grid> 

            <Grid 
                item
                xl={12} lg={12} md={12} sm={12} xs={12} 
            >
                <Divider />
            </Grid>
        </>
    )
}
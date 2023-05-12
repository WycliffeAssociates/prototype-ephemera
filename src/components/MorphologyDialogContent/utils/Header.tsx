import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import Divider from '@mui/material/Divider';


interface HeaderProps {
    onClose?: () => void;
    fullScreen?: boolean;
    morphologyWord?: string;
}


export function Header({ onClose, fullScreen, morphologyWord}: HeaderProps) {

    function capitalizeFirstLetter(str : string | undefined) : string {
        if(str === undefined) {
            return "";
        }

        if (/^[a-zA-Z]/.test(str)) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        } else {
            return str;
        }
    }

    return (
        <>
            <Grid 
                item
                xl={8} lg={8} md={8} sm={8} xs={8}
            >
                <h3 style={{float:"left", paddingLeft:"2%", color: (!fullScreen ? "#015AD9" : "black")}}>
                    {fullScreen === false ? capitalizeFirstLetter(morphologyWord?.trim() as string) : "Learn More" }
                </h3>
            </Grid>

            <Grid 
                item xl={2} lg={2} md={2} sm={2} xs={2} 
                style={{margin: "auto",}}
            >
                <Button onClick={onClose} variant="outlined" style={{
                                                                        float:"right", 
                                                                        border: "1px solid #E5E8EB", 
                                                                        borderRadius: "16px", 
                                                                        color:"#33445C", 
                                                                        textTransform:"none", 
                                                                        minWidth: (fullScreen === false ? "113px" : "65px")
                                                                    }}
                >
                    <ArrowBackIcon/> {fullScreen !== true ? "Go Back" : ""}
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
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CloseIcon from '@material-ui/icons/Close';


interface HeaderProps {
    onClose?: () => void;
    fullScreen?: boolean;
}


export function Header({ onClose }: HeaderProps) {

    return (
        <>

            <Grid 
                item
                xl={10} lg={10} md={10} sm={10} xs={8}
                style={{padding:"0px 0px 0px 20px"}}
            >
                <h3 className="BannerHeader" style={{float:"left", fontSize: "20px", padding:"0px"}}>
                    Settings
                </h3>
            </Grid>

            <Grid 
                item xl={2} lg={2} md={2} sm={2} xs={4} 
                style={{
                    margin: "auto",
                    padding: "0px 20px 0px 0px",
                }}
            >
                
                <Button onClick={onClose} variant="outlined" style={{
                                                                     
                                                                        border: "1px solid #E5E8EB", 
                                                                        borderRadius: "16px", 
                                                                        color:"#33445C", 
                                                                        textTransform:"none", 
                                                                    }}
                >
                    <CloseIcon/>
                </Button>
            </Grid> 

            <Grid 
                item
                xl={12} lg={12} md={12} sm={12} xs={12} 
                style={{padding:"0px 0px 20px 0px"}}
            >
                <Divider />
            </Grid>
        </>
    )
}
import { Button, Grid } from "@mui/material";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';


export function ContinueReadingButton() {
    return (
        <Grid  
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                style={{ position:"fixed", bottom: "8%"}}

        >
            <Grid item >
                <Button 
                    onClick={() => console.log("Figure out what Aby wants to do here")} 
                    variant="text" 
                    style={{
                            border: "1px solid #E5E8EB", 
                            boxShadow:"0px 10px 20px rgba(0, 21, 51, 0.19), 0px 6px 6px rgba(0, 21, 51, 0.23)", 
                            borderRadius:"16px", 
                            color:"#33445C", 
                            background: "white", 
                            width:"210px"
                        }}
                >

                    <ArrowDownwardIcon/> Continue Reading <ArrowDownwardIcon/>
                </Button>

            </Grid>
        </Grid>
    )
}
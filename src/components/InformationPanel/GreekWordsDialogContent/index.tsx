import Grid from '@mui/material/Grid';
import { FormattedGreekWord } from '../../../types'
import TipsDialogContent from '../TipsDialogContent'
import GreekWordInfo from '../GreekWordInfo';
import Divider from '@mui/material/Divider';
import { Button } from '@mui/material';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
 

interface GreekWordsDialogProps {
  open: Boolean;
  onClose?: () => void;
  greekWords: FormattedGreekWord[];
};


function GreekWordsDialogContent({open, onClose, greekWords} : GreekWordsDialogProps) {
    if(open === false) return <></>;

    return ( 
        <>
            {greekWords !== undefined && greekWords.length > 0 ? 
                <> 
                    <div style={{overflow:"auto", maxHeight:"72vh", paddingRight:"40px"}}>
                        {greekWords.map((data, idx) => (
                            <> 
                                <GreekWordInfo key={idx} currentGreekWord={data}/>
                                <Grid 
                                    item
                                    xl={12} lg={12} md={12} sm={12} xs={12} 
                                >
                                    <Divider />
                                </Grid>
                            </>
                        ))}

                        <Button 
                                onClick={() => console.log("Figure out what Aby wants to do here")} 
                                variant="text" 
                                style={{
                                        position:"fixed", 
                                        bottom: "8%", 
                                        right: "24.17%", 
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
                    
                    </div>
                
                </>
            :
                <TipsDialogContent open={true} onClose={onClose}/> 
            }
            
        </>
    )
}


export default GreekWordsDialogContent;
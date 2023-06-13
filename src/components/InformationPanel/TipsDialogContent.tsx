import Grid from '@mui/material/Grid';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import { useSettings } from '../../hooks/SettingsContext';
import { mapValidGWTSettings } from './GreekWordInfo/utils/mapValidGWTSettings';

interface TipsDialogContentProps {
    open: Boolean;
    onClose?: () => void;
  };
  

export default function TipsDialogContent({open, onClose} : TipsDialogContentProps) {

  const { GWTSettings } = useSettings();
  let overwriteStyle : any = mapValidGWTSettings(GWTSettings);
  
  if(open) {
    return (
      <Grid container direction="row" style={{paddingTop: "8px", fontSize:"20px"}}>
        <Grid item lg={12} xl={12} md={12} style={{maxHeight: '80vh',overflow:"auto", textAlign:"left", padding:"0px 40px 0px 0px", ...overwriteStyle}}>
            
            <Grid container>
              <Grid item>
                <InfoIcon/>
              </Grid>

              <Grid item>
                <h3 style={{display:"inline", paddingLeft:"5px"}}>Tip</h3>
              </Grid>
            </Grid>

            <h4>Get Started</h4>
            <p>To learn about a word or phrase, click on it.</p>
            <p>Once a word is selected it will be underlined in blue. The information about that word will appear in the right-hand panel</p>
            <h4>Navigation</h4>
            <p>To change a book or chapter click the book name or chapter number located on the left panel above the Scripture text.</p>
            <h4>Settings</h4>
            <p>To change how the font size and line height, click the settings button at the top of the page.</p>
        </Grid>
      </Grid>
    )
  } else {
    return <></>
  }


}
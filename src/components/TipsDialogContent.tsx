import Grid from '@mui/material/Grid';
import InfoIcon from '@material-ui/icons/InfoOutlined';

interface TipsDialogContentProps {
    open: Boolean;
    onClose?: () => void;
  };
  

export function TipsDialogContent({open, onClose} : TipsDialogContentProps) {

    return (
        <Grid container direction="row" style={{paddingTop: "8px"}}>

        <Grid item lg={12} xl={12} md={12} style={{maxHeight: '80vh', textAlign:"left", paddingLeft:"15px", paddingBottom:"50px"}}>
            <Grid container>
              <Grid item>
                <InfoIcon/>
              </Grid>

              <Grid item>
                <h3 style={{display:"inline", paddingLeft:"5px"}}>Tip</h3>
              </Grid>
            </Grid>
            <h4>Get Started</h4>
            <p>To view a Greek translation, select the desired word or phrase.</p>
            <p>If you'd like to view a new word, select the desired word to view a new translation. Once a word is selected it will be underlined in blue.</p>
            <h4>Navigation</h4>
            <p>To change a boor or chapter click the book name or chapter number located on teh left panel above the Scripture text.</p>
            <h4>Settings</h4>
            <p>To change how you view the font size, click the settings button at the top of the page.</p>
        </Grid>
      </Grid>
    )

}
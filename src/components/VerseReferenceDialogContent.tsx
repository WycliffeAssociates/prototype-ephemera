import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { VerseReferenceText } from './VerseReferenceText';


interface VerseReferenceDialogContentProps {
    open: Boolean;
    onClose?: () => void;
    refBookChapterVerse: {refBook: string, refChapter: string, refVerse: string, refWord: string};
    fullScreen?: boolean;
};
  

export function VerseReferenceDialogContent({open, onClose, refBookChapterVerse, fullScreen} : VerseReferenceDialogContentProps) {
    if(open) {
      return (
        <Grid container direction="row" style={{paddingTop: "8px"}}>

          <Grid item lg={12} xl={12} md={12} sm={12} xs={12} style={{maxHeight:"fit-content", overflow:"hidden", textAlign:"left", paddingLeft:"15px"}}>
              <Grid container>

                <Grid 
                      item
                      xl={8} lg={8} md={8} sm={8} xs={8} 
                  >
                      <h3 style={{color: "#015AD9",}}>{refBookChapterVerse.refBook} {refBookChapterVerse.refChapter}</h3>
                  </Grid>

                  <Grid 
                      item xl={2} lg={2} md={2} sm={2} xs={2} 
                      style={{margin: "auto"}}
                  >
                      <Button onClick={onClose} variant="outlined" style={{float:"right", border: "1px solid #E5E8EB", borderRadius: "16px", color:"#33445C", textTransform:"none",}}>
                          <ArrowBackIcon/> {fullScreen !== true ? "Go Back" : ""}
                      </Button>
                  </Grid> 

                <Grid item 
                      xl={12} lg={12} md={12} sm={12} xs={12} 
                      style={{maxHeight:"80vh", overflowY:"scroll"}}
                      id="verseReferenceContainer"
                >
                  <VerseReferenceText 
                    refBook={refBookChapterVerse.refBook} 
                    refChapter={parseInt(refBookChapterVerse.refChapter)} 
                    refVerse={refBookChapterVerse.refVerse} 
                    refWord={refBookChapterVerse.refWord}
                  />
                </Grid>
              </Grid>
          </Grid>
      </Grid>
      )
    } else {
      return <></>
    }


}



import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import "../App.css";

interface greekWord {
    greekWords: string;
    englishWords: string;
    morphology: string;
    descriptions: string[];
};

function GreekWordInfo({greekWords, englishWords, morphology, descriptions} : greekWord)
{
    return (
      <Grid container spacing={0} direction="row" style={{padding:"0px"}}>
        <Grid item sm={12} xs={12}>
          <p className="GreekWord">{greekWords}</p> 
        </Grid>
        <Grid item sm={12} xs={12}>
          <p className="EnglishWord">{englishWords}</p> 
        </Grid>

        <Grid item sm={12} xs={12}>
          <p className="GreekWordInfoSubCategory">Morphology</p>
        </Grid>
        <Grid item sm={12} xs={12}>
              <p className="GreekWordInfoSubCategoryValue">{morphology}</p>
        </Grid>

        <Grid item sm={12} xs={12}>
        <p className="GreekWordInfoSubCategory">Description</p>
        </Grid>
        <Grid item sm={12} xs={12}>
          <ul style={{marginTop:"0px", paddingInlineStart: "25px",}}>
            {descriptions.map((description, idx) => (
                <li>
                  <p className="GreekWordInfoSubCategoryValue">{description}</p>
                </li> 
            ))}
          </ul>
          
        </Grid>
      </Grid>
    )
}

export default GreekWordInfo;
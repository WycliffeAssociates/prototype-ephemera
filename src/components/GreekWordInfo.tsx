import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


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
          <p style={{
                    textAlign:"left", 
                    marginBottom:"2px",
                    height: "36px",
                    fontFamily: "Lato",
                    fontStyle: "normal",
                    fontWeight: "700",
                    fontSize: "24px",
                    lineHeight: "150%",
                    color:"#001432"}}>{greekWords}</p> 
        </Grid>
        <Grid item sm={12} xs={12}>
          <p style={{
                    textAlign:"left", 
                    marginTop:"0px",
                    marginBottom:"0px",
                    height: "24px",
                    fontFamily: 'Lato',
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "16px",
                    lineHeight: "150%",
                    color:"#001432"}}>{englishWords}</p> 
        </Grid>

        <Grid item sm={12} xs={12}>
          <p style={{
                    textAlign:"left", 
                    marginBottom:"4px",
                    height: "18px",
                    fontFamily: 'Lato',
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "12px",
                    lineHeight: "150%",
                    textTransform: "uppercase",
                    color:"#00193c",
                  }}>Morphology</p>
        </Grid>
        <Grid item sm={12} xs={12}>
              <p style={{
                        textAlign:"left", 
                        marginTop:"0px", 
                        marginBottom:"2px", 
                        fontFamily: 'Lato',
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "16px",
                        lineHeight: "150%",
                        }}>{morphology}
              </p>
        </Grid>

        <Grid item sm={12} xs={12}>
        <p style={{
                    textAlign:"left", 
                    marginBottom:"4px",
                    height: "18px",
                    fontFamily: 'Lato',
                    fontStyle: "normal",
                    fontWeight: "400",
                    fontSize: "12px",
                    lineHeight: "150%",
                    textTransform: "uppercase",
                    color:"#00193c",
                  }}>Description</p>
        </Grid>
        <Grid item sm={12} xs={12}>
          <ul style={{marginTop:"0px", paddingInlineStart: "25px",}}>
            {descriptions.map((description, idx) => (
                <li>
                <p style={{
                            textAlign:"left",
                            width:"100%", 
                            marginTop:"0px", 
                            marginBottom:"2px", 
                            fontFamily: 'Lato',
                            fontStyle: "normal",
                            fontWeight: "400",
                            fontSize: "16px",
                            lineHeight: "150%",
                            }}>{description}</p>
                </li> 
            ))}
          </ul>
          
        </Grid>
      </Grid>
    )
}



export default GreekWordInfo;
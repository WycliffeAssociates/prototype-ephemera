import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';


function GreekWordInfo() {
    return (
        <Box style={{height:"90vh", width:"100%;", backgroundColor:"#f2f2f2"}}>
              <Grid container spacing={0} direction="row" style={{padding:"0px"}}>
                <Grid item sm={12} xs={12}>
                  <p style={{
                            textAlign:"left", 
                            marginBottom:"2px",
                            width: "400px",
                            height: "36px",
                            fontFamily: "Lato",
                            fontStyle: "normal",
                            fontWeight: "700",
                            fontSize: "24px",
                            lineHeight: "150%",
                            color:"#001432"}}>Greek/English</p> 
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
                            color:"#001432"}}>English word/phrase</p> 
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
                                }}>Morphology1
                      </p>
                      <p style={{
                                textAlign:"left", 
                                marginTop:"0px", 
                                marginBottom:"2px", 
                                fontFamily: 'Lato',
                                fontStyle: "normal",
                                fontWeight: "400",
                                fontSize: "16px",
                                lineHeight: "150%",
                                }}>Morphology2
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
                                  }}>Description1 Descr iption1D escription1 Description1Description1 Description1 Description1</p>
                    </li>
                    <li>
                      <p style={{
                                textAlign:"left", 
                                marginTop:"0px", 
                                marginBottom:"2px", 
                                fontFamily: 'Lato',
                                fontStyle: "normal",
                                fontWeight: "400",
                                fontSize: "16px",
                                lineHeight: "150%",
                                }}>Description1 Descr iption1D escription1 Description1Description1 Description1 Description1</p>
                    </li>
                  </ul>
                  
                </Grid>
              </Grid>
            </Box>
    )
}


export default GreekWordInfo;
import Grid from '@mui/material/Grid';

interface greekWordProps {
    greekWord: string | undefined,
    englishEquivalent: string
};

function GreekWord({greekWord, englishEquivalent} : greekWordProps) {

    return (
        <>
            <Grid item sm={12} xs={12}>
                <p className="GreekWord">{greekWord}</p> 
            </Grid>
            <Grid item sm={12} xs={12}>
                { englishEquivalent !== "√" ? <p className="EnglishWord">{englishEquivalent}</p> : ""}
            </Grid>
        </>
    )
}


export default GreekWord;

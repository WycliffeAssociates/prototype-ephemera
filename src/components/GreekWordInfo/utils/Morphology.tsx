import Grid from '@mui/material/Grid';

interface morphologyProps {
    morphology: string | undefined
};

function Morphology({morphology} : morphologyProps) {

    if(morphology !== undefined)
    {
        return (
            <>
                <Grid item sm={12} xs={12}>
                <p className="GreekWordInfoSubCategory">Morphology</p>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <p className="GreekWordInfoSubCategoryValue">{morphology}</p>
                </Grid>
            </>
        )
    }
    else
    {
        return (<></>)
    }

}


export default Morphology;
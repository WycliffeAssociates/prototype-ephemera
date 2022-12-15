import Grid from '@mui/material/Grid';
import { getMorphDescription } from '../../../applicationLogic/mapMorph';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import {useState} from "react"
import { styled } from '@mui/material/styles';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: theme.palette.common.white,
        color: 'rgba(0, 0, 0, 0.87)',
        boxShadow: theme.shadows[1],
        fontSize: 11,
        },
}));


interface morphologyProps {
    morphology?: string,
    abbreviatedMorphology?: string
};

function Morphology({morphology, abbreviatedMorphology} : morphologyProps) {

    const [morphDescriptionOpen, setMorphDescriptionOpen] = useState(false);
    
    if(morphology !== undefined)
    {
        return (
            <>
                <Grid item sm={12} xs={12}>
                <p className="GreekWordInfoSubCategory">Morphology</p>
                </Grid>
                <Grid item sm={12} xs={12}>
                    <p className="GreekWordInfoSubCategoryValue">{morphology}</p>

                    {abbreviatedMorphology ?
                        <ClickAwayListener onClickAway={() => {setMorphDescriptionOpen(false); }}>
                            <div>
                                <LightTooltip
                                    title={getMorphDescription(abbreviatedMorphology)}
                                    placement="bottom-end"
                                    PopperProps={{
                                        disablePortal: true,
                                    }}
                                    onClose={() => setMorphDescriptionOpen(false)}
                                    open={morphDescriptionOpen}
                                    disableFocusListener
                                    disableHoverListener
                                    disableTouchListener
                                >
                                    <p
                                        className="GreekWordInfoSubCategoryValue"
                                        style={{textDecoration: "underline", color:"blue", width:"100%"}}
                                        onClick={() => setMorphDescriptionOpen(true)}
                                    >
                                        Learn More
                                    </p>
                                </LightTooltip>
                            </div>
                        </ClickAwayListener>
                    : ""}
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
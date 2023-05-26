import { useEffect, useState } from "react";
import TipsDialogContent from "../../InformationPanel/TipsDialogContent";
import { BannerMessage } from "./BannerMessage";
import { ContinueReadingButton } from "./ContinueReadingButton";
import useWindowSize from "../../../hooks/useWindowSize";
import { FormattedGreekWord } from "../../../types";
import GreekWordInfo from "../../InformationPanel/GreekWordInfo";


interface GreekWordsContentProps {
    greekWords : FormattedGreekWord[];
    onClose: () => any;
}

export function GreekWordsContent( { greekWords, onClose } : GreekWordsContentProps){

    const [modalHeight, setModalHeight] = useState("");
    const windowSize = useWindowSize([]);


    useEffect(() => {
        let height = windowSize.innerHeight / 10.0; // Ratio for window height to scrollable area
        setModalHeight(height + "vh");
    }, [windowSize.innerHeight])

    
    return (
        <>
            <BannerMessage greekWords={greekWords}/>

            {greekWords !== undefined && greekWords.length > 0 ? 
                <div style={{maxHeight:modalHeight, overflowY:"scroll", padding:"0px 0px 40px 0px", paddingRight:"15px", scrollPadding:"50px"}}>
                    {greekWords.map((data, idx) => (
                        <div style={{borderBottom: "solid", borderColor: "#d9d9d9", overflow:"hidden"}}> 
                            <GreekWordInfo key={idx} currentGreekWord={data} showMoreOptions={true}/>                                          
                        </div>
                    ))}

                        <ContinueReadingButton/>
                </div>   
            :
                <TipsDialogContent open={true} onClose={onClose}/> 
            }
        </>
    )
}
import { Button, Grid } from "@mui/material";
import { MutableRefObject, useEffect, useState } from "react";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

interface ContinueReadingButtonProps {
    containerRef: MutableRefObject<HTMLDivElement | null>;
    leftPosition?: string;
    rightPosition?: string;
}

export function ContinueReadingButton({ containerRef, rightPosition, leftPosition }: ContinueReadingButtonProps) {

    const [showContinueReadingButton, setShowContinueReadingButton] = useState<boolean>(true);

    useEffect(() => {
        if (!containerRef.current) return;
      
        const resizeObserver = new ResizeObserver((entries) => {
          for (const entry of entries) {
            if (entry.target === containerRef.current) {
                if(entry.target.clientHeight >= entry.target.scrollHeight ) {
                    setShowContinueReadingButton(false);
                } else {
                    setShowContinueReadingButton(true)
                }
            }
          }
        });
      
        resizeObserver.observe(containerRef.current);
      
        return () => {
          if (containerRef.current) {
            resizeObserver.unobserve(containerRef.current);
          }
          resizeObserver.disconnect();
        };
      }, []);


    useEffect(() => {
        if (containerRef?.current) {
            const element = containerRef.current as HTMLElement;
            element.addEventListener("scroll", onScroll);
            return () => {
                element.removeEventListener("scroll", onScroll);
            }
        }
    }, [containerRef]);


    function onScroll() {
        if (containerRef?.current) {
            const container = containerRef.current as HTMLElement;
            const { scrollTop, scrollHeight, clientHeight } = container;
            if (scrollTop + clientHeight >= scrollHeight - 5) {   
                setShowContinueReadingButton(false);
            } else {
                setShowContinueReadingButton(true);

                if(container.style.display === "hidden") {
                    container.style.display = "block";
                }
            }
        }
    }

    if(!leftPosition && !rightPosition) {
        return (
            <div id="continueReadingBtn">
                {showContinueReadingButton ? (
                <Grid  
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    style={{ position:"fixed", bottom: "8%"}}
                >
                    <Grid item >
                        <Button 
                            onClick={() => console.log("Figure out what Aby wants to do here")} 
                            variant="text" 
                            style={{
                                    border: "1px solid #E5E8EB", 
                                    boxShadow:"0px 10px 20px rgba(0, 21, 51, 0.19), 0px 6px 6px rgba(0, 21, 51, 0.23)", 
                                    borderRadius:"16px", 
                                    color:"#33445C", 
                                    background: "white", 
                                    width:"250px"
                                }}
                        >

                            <ArrowDownwardIcon/> Continue Reading <ArrowDownwardIcon/>
                        </Button>

                    </Grid>
                </Grid>
            ):<></>}
            </div>
        )

    } else {
        return (
            <div id="continueReadingBtn">
                {showContinueReadingButton ? (
                    <Button
                        onClick={() => console.log("Figure out what Aby wants to do here")}
                        variant="text"
                        style={{
                            position: "fixed",
                            bottom: "8%",
                            right: rightPosition ? rightPosition : "",
                            left: leftPosition ? leftPosition : "",
                            border: "1px solid #E5E8EB",
                            boxShadow: "0px 10px 20px rgba(0, 21, 51, 0.19), 0px 6px 6px rgba(0, 21, 51, 0.23)",
                            borderRadius: "16px",
                            color: "#33445C",
                            background: "white",
                            width: "250px"
                        }}
                    >
                        <ArrowDownwardIcon /> Continue Reading <ArrowDownwardIcon />
                    </Button>
                ):<></>}
            </div>
        )
    }


}

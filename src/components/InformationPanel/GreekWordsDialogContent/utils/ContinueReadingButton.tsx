import { Button } from "@mui/material";
import { MutableRefObject, useEffect, useState } from "react";
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

interface ContinueReadingButtonProps {
    containerRef?: MutableRefObject<null>;
}

export function ContinueReadingButton({ containerRef }: ContinueReadingButtonProps) {
    const [showContinueReadingButton, setShowContinueReadingButton] = useState<boolean>(false);

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
            }
        }
    }

    return (
        <>
            {showContinueReadingButton && (
                <Button
                    onClick={() => console.log("Figure out what Aby wants to do here")}
                    variant="text"
                    style={{
                        position: "fixed",
                        bottom: "8%",
                        right: "20.17%",
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
            )}
        </>
    )
}

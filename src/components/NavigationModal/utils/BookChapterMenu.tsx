import { useEffect, useState } from "react"
import Grid from '@mui/material/Grid';
import Books from './Books';
import Chapters from './Chapters';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../../../App.css';
import useBookChapterParams from '../../../hooks/useBookChapterParams';
import {books as newTestamentMetadata} from '../../../applicationLogic/data/newTestamentMetadata';
import { Button } from "@mui/material";
import useWindowSize from "../../../hooks/useWindowSize";
import CloseIcon from '@material-ui/icons/Close';


interface BookChapterMenuProps {
    withClickableOptions: boolean;
    openTab?: "Books" | "Chapters";
    onClose?: (params ?: any) => void;
}


function BookChapterMenu({withClickableOptions, openTab, onClose} : BookChapterMenuProps) {

    const [value, setValue] = useState(openTab !== undefined ? openTab : "Books");
    const [displayBooks, setDisplayBooks] = useState(true);
    const [displayChapters, setDisplayChapters] = useState(true);
    const [bookData, setBookData] = useState("");
    const bookChapter = useBookChapterParams().getBookChaptersParams();
    const windowSize = useWindowSize([]);
    const [clickedBookElement, setClickedBookElement] = useState<null | HTMLDivElement>();

    useEffect(() => {
        if(withClickableOptions) {
            if(value === "Books") {
                setDisplayBooks(true);
                setDisplayChapters(false);
    
            }
            else if(value === "Chapters") {
                setDisplayChapters(true);
                setDisplayBooks(false);
            }
        }
        else {
            setDisplayChapters(true);
            setDisplayBooks(true);
        }

    }, [withClickableOptions, value]);



    useEffect(() => {
        let scrollableParent = document.getElementById("BookChapterMenuContainer");
        if(clickedBookElement !== null && clickedBookElement !== undefined) {
            scrollableParent?.scrollTo(0,clickedBookElement.offsetTop - 70)
        }
        

    }, [bookChapter, clickedBookElement])


    function onBookClick(newBook : null | HTMLDivElement) {

        let newBookName : string = newBook?.id.charAt(0).toUpperCase() + (newBook?.id.slice(1) as string);
        if(newBookName !== bookChapter.book) {
            setValue("Chapters")
        }
        if(newTestamentMetadata[newBookName] !== undefined) {
            setBookData(newBookName)
        }

        setClickedBookElement(newBook);
    }
    
    function onBookChange() {
        setBookData("");
    }

    const handleChange = (event: React.SyntheticEvent, newValue: "Books" | "Chapters") => {
        setValue(newValue);
    };

    return (
        <>
            { withClickableOptions ? 
                <Box sx={{ borderBottom: 1, borderColor: 'divider', width:"100%", height:"48px"}}>
                    <Tabs value={value} 
                          onChange={handleChange} 
                          aria-label="basic tabs example" 
                          centered
                          className="BookChapterMenu__Tabs"
                    >
                        <Tab 
                                className="BookChapterMenu__Tabs__Tab" 
                                label={(bookData.length <= 2) ? bookChapter.book : bookData} 
                                value={"Books"}/>
                        <Tab className="BookChapterMenu__Tabs__Tab" label="Chapters" value={"Chapters"}/>
                    </Tabs>
                </Box>
                : ""
            }   

            <Grid 
                className="BookChapterMenu__Books" 
                item 
                xs={12} sm={12} md={12} lg={12} xl={12} 
                style={{ display: displayBooks ? "block" : "none", paddingTop:"5%", paddingBottom:"15%"}}
            >
                <Books 
                    onChange={onBookChange} 
                    handleClick={onBookClick} 
                    currentBook={bookChapter.book}
                />

            </Grid>

            <Grid 
                className="BookChapterMenu__Chapters" 
                item 
                xs={12} sm={12} md={12} lg={12} xl={12}
                style={{ display: displayChapters ? "block" : "none", height:"calc(100% - 88px)" }} 
            >
                <Chapters selectedBook={bookData}/>
            </Grid>

            { windowSize.innerWidth >= 900 ?
                <Button onClick={onClose} variant="text" style={{
                                                                    position:"fixed", 
                                                                    bottom: "5%", 
                                                                    left: "15%", 
                                                                    border: "1px solid #E5E8EB", 
                                                                    boxShadow:"0px 10px 20px rgba(0, 21, 51, 0.19), 0px 6px 6px rgba(0, 21, 51, 0.23)", 
                                                                    borderRadius:"16px", 
                                                                    color:"#33445C", 
                                                                    background: "white", 
                                                                    width:"115px"
                                                                }}
                >

                   <CloseIcon/> Close
                </Button>

            : ""}
            

        </>
    )
    
}

export default BookChapterMenu;
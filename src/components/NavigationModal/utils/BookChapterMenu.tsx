import { useEffect, useState } from "react"
import Grid from '@mui/material/Grid';
import Books from './Books';
import Chapters from './Chapters';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../../../App.css';
import useBookChapterParams from '../../../hooks/useBookChapterParams';
import {books as newTestamentMetadata} from '../../../applicationLogic/newTestamentMetadata';


interface BookChapterMenuProps {
    withClickableOptions: boolean;
    openTab?: "Books" | "Chapters" | "Verses";
}
function BookChapterMenu({withClickableOptions, openTab} : BookChapterMenuProps) {

    const [value, setValue] = useState(openTab !== undefined ? openTab : "Books");
    const [displayBooks, setDisplayBooks] = useState(true);
    const [displayChapters, setDisplayChapters] = useState(true);
    const [bookData, setBookData] = useState("");
    const bookChapter = useBookChapterParams().getBookChaptersParams();

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

    }, [withClickableOptions, value])


    function onBookClick(newBook : string) {
        newBook = newBook.charAt(0).toUpperCase() + newBook.slice(1);
        if(newBook !== bookChapter.book) {
            setValue("Chapters")
        }
        if(newTestamentMetadata[newBook] !== undefined) {
            setBookData(newBook)
        }
    }
    
    function onBookChange() {
        setBookData("");
    }

    const handleChange = (event: React.SyntheticEvent, newValue: "Books" | "Chapters" | "Verses") => {
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
                    >
                        <Tab label="Books" value={"Books"}/>
                        <Tab label="Chapters" value={"Chapters"}/>
                        <Tab label="Verses" value={"Verses"}/>
                    </Tabs>
                </Box>
                :
                <>
                    <Grid 
                        className="NavigationModal__MeanuHeader" 
                        item 
                        xs={0} sm={0} md={5} lg={5} xl={5} 
                        style={{ borderRight: "1px solid grey" }}
                    >
                        <p>Books</p>
                    </Grid>
        
                    <Grid 
                        className="NavigationModal__MeanuHeader" 
                        item 
                        xs={0} sm={0} md={7} lg={7} xl={7}  
                    >
                        <p>Chapters</p>
                    </Grid>
                </>
            }  

            <Grid 
                className="BookChapterMenu__Books" 
                item 
                xs={12} sm={12} md={5} lg={5} xl={5} 
                style={{ display: displayBooks ? "block" : "none", height:"calc(100% - 88px)"}}
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
                xs={12} sm={12} md={7} lg={7} xl={7}
                style={{ display: displayChapters ? "block" : "none", height:"calc(100% - 88px)" }} 
            >
                <Chapters selectedBook={bookData}/>
            </Grid>
        </>
    )
    
}

export default BookChapterMenu;
import { useEffect, useState } from "react"
import Grid from '@mui/material/Grid';
import Books from './Books';
import Chapters from './Chapters';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import '../../../App.css';



interface BookChapterMenuProps {
    withClickableOptions: boolean; // TODO: change name of isClickable to be more descriptive to its acutal usage
    openTab?: string; // TOOD: make thie restrictive to only "Books", "Chapters", and "Verses"
}
function BookChapterMenu({withClickableOptions, openTab} : BookChapterMenuProps) {

    const [value, setValue] = useState(openTab !== undefined ? openTab : "Books");
    const [displayBooks, setDisplayBooks] = useState(true);
    const [displayChapters, setDisplayChapters] = useState(true);
    const [bookData, setBookData] = useState("");

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
        setValue("Chapters")
        setBookData(newBook)
    }   

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
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
                    <Grid className="NavigationDialog__MeanuHeader" item xs={0} sm={0} md={5} lg={5} xl={5} 
                          style={{ borderRight: "1px solid grey" }}
                    >
                        <p >Books</p>
                    </Grid>
        
                    <Grid className="NavigationDialog__MeanuHeader" item xs={0} sm={0} md={7} lg={7} xl={7}  >
                        <p>Chapters</p>
                    </Grid>
                </>
            }  

            <Grid className="BookChapterMenu__Books" item xs={12} sm={12} md={5} lg={5} xl={5} 
                    style={{ display: displayBooks ? "block" : "none" }}>
                <Books handleClick={onBookClick}/>
            </Grid>

            <Grid className="BookChapterMenu__Chapters" item xs={12} sm={12} md={7} lg={7} xl={7}
                  style={{ display: displayChapters? "block" : "none" }} 
            >
                <Chapters book={bookData}/>
            </Grid>
        </>
    )
    
}

export default BookChapterMenu;
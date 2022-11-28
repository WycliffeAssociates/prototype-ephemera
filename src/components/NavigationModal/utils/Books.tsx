import Grid from '@mui/material/Grid';
import { books as newTestamentMetadata } from "../../../applicationLogic/newTestamentMetadata";
import { useRef, useState } from 'react';
import BookSearchBar from '../../BookSearchBar';
import Box from '@mui/material/Box';


interface BookProps {
    bookData: any[];
    handleClick: (params: any) => any;
    isCurrentBook: boolean;
}

function Book({bookData, handleClick, isCurrentBook}: BookProps) {

    const bookRef = useRef(null);

    function onClick() {
        handleClick(bookRef);
    }

    if(isCurrentBook == true) {
        handleClick(bookRef);
    }

    return (
        <div className='BookChapterMenu__Books__Book' id={bookData[0]} ref={bookRef} onClick={onClick}>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}> 
                <p>{bookData[0]}</p>
            </Grid> 
        </div>
    )
}



interface BooksProps {
    handleClick: (params: any) => any;
    currentBook: string;
}

function Books( { handleClick, currentBook } : BooksProps) {

    // const bookChapter = useBookChapterParams();
    const [childClicked, setChildClicked] = useState<any>(null);
    const [filteredBooks, setFilteredBooks] = useState(Object.entries(newTestamentMetadata));

    function handleChildClicked(newChildClicked: any) {
        handleClick(newChildClicked.current.id)

        if(childClicked?.current?.style?.color !== undefined) 
        {
            childClicked.current.style.color = "#001533CC";
            childClicked.current.style.backgroundColor = "white";
        } 

        if(newChildClicked?.current?.style?.color !== undefined)
        {
            newChildClicked.current.style.color = "blue";
            newChildClicked.current.style.backgroundColor = "#015ad90d";
        }

        newChildClicked.current.scrollIntoView();
        setChildClicked(newChildClicked);
    }

    function handleSearchInput(userInput: string) {
        // TODO: add some validation logic here
        handleClick(userInput);
    }

    function onBookFilter(filter : string) {
        let tempArray = Object.entries(newTestamentMetadata).filter((book) => {

            if(filter === "") {
                return true;
            }

            if(filter.toLowerCase().charAt(0) === book[0].toLowerCase().charAt(0))
            {
                return book[0].toLowerCase().includes(filter.toLowerCase())
            }
            
            return false;  
        })
        setFilteredBooks(tempArray)
    }


    return (
        <Box sx={{height: "100%", overflow:"auto",}}>
            <Grid   
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
            >

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  >
                    <BookSearchBar onClick={handleSearchInput} onFilter={onBookFilter}/>
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  >
                    <Grid   
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        
                    >

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{borderBottom: "1px solid grey"}}> 
                            <p className='GreekWordInfoSubCategory' style={{marginLeft: "15px",}}>New Testament</p>
                        </Grid>

                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12} style={{borderBottom: "1px solid grey"}}> 
                            <Grid   
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                            >   
                                {filteredBooks.map((book : any[]) => (
                                    <Book 
                                          bookData={book} 
                                          handleClick={handleChildClicked}
                                          isCurrentBook={(childClicked === null && book[0] === currentBook)}
                                    />    
                                ))}
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Books;
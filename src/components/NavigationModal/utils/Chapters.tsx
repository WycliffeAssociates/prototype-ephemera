import Grid from '@mui/material/Grid';
import { books as newTestamentMetadata } from "../../../applicationLogic/newTestamentMetadata";
import {useNavigate, createSearchParams } from "react-router-dom";
import useBookChapterParams from '../../../hooks/useBookChapterParams';
import { useEffect, useState } from 'react';


interface ChapterProps {
    chapterNum: number;
    onClick: (params: any) => any;
    isActiveChapter?: boolean;
}

function Chapter({chapterNum, onClick, isActiveChapter} : ChapterProps) {

    let baseStyle = {
        height:"56px", 
        width:"93.5px",
        "borderRadius": "3px"
    }

    let chapterStyle;
    if(isActiveChapter) {
        chapterStyle = {
            color: "blue",
            backgroundColor:"#F2F7FD",
            ...baseStyle
        }
    } else {
        chapterStyle = {
            color: "black",
            ...baseStyle
        }
    }

    return (
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} style={chapterStyle} >
            <p onClick={() => onClick((chapterNum))} >
                {(chapterNum)}
            </p>
        </Grid>
    )
}



interface ChaptersProps {
    selectedBook: string;
}

function Chapters({selectedBook} : ChaptersProps) {

    const [numChapters, setNumChapters] = useState(0);
    const currentBookChapter = useBookChapterParams().getBookChaptersParams();
    const navigate = useNavigate();

    useEffect(() => {

        // If a book has been clicked, then use the selected books chapters
        // else use the most recently clicked book's chapters
        if(selectedBook && selectedBook !== "") {
            setNumChapters(newTestamentMetadata[selectedBook].numChapters);
        }
        else if(currentBookChapter.book && currentBookChapter.book !== "") {
            setNumChapters(newTestamentMetadata[currentBookChapter.book].numChapters);
        }
        else
        {
            setNumChapters(0);
        }
    }, [selectedBook])


    let chapters : any[]  = [];

    function onChapterClick(chapterNum : number) {

        const params = {
            book: selectedBook !== "" ? selectedBook : currentBookChapter.book,
            chapter: chapterNum + ""
          };
      
        const options = {
            pathname: '/',
            search: `?${createSearchParams(params)}`,
        }

        navigate(options, { replace: true });
    }

    if(numChapters !== undefined) {
        for(let i = 0; i < numChapters; i++) {
            let chapterElement = (
                <Chapter 
                    key={`chapter ${i}`}
                    chapterNum={(i+1)} 
                    onClick={onChapterClick} 
                    isActiveChapter={selectedBook === currentBookChapter.book && (i+1) === parseInt(currentBookChapter.chapter)}
                />
            )
            chapters.push(chapterElement);
        }
    }

    return (
        <Grid   
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            style={{height:"100%", padding:"0px 0px 40px 0px"}}
        >
            {numChapters > 0 ? chapters.map((chapter) => chapter) : ""}
        </Grid>
    )
}

export default Chapters;
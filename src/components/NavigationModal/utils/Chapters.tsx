import Grid from '@mui/material/Grid';
import { books as newTestamentMetadata } from "../../../applicationLogic/newTestamentMetadata";
import {useNavigate, createSearchParams } from "react-router-dom";
import useBookChapterParams from '../../../hooks/useBookChapterParams';
import { useEffect, useState } from 'react';


interface ChapterProps {
    chapterNum: number;
    onClick: (params: any) => any;
}

function Chapter({onClick, chapterNum} : ChapterProps) {

    return (
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}>
            <p onClick={() => onClick((chapterNum))}>
                {(chapterNum)}
            </p>
        </Grid>
    )

}


interface ChaptersProps {
    book: string;
}

function Chapters({book} : ChaptersProps) {

    const [numChapters, setNumChapters] = useState(0);
    const bookChapter = useBookChapterParams();
    const navigate = useNavigate();

    useEffect(() => {

        // If a book has been clicked, then use the selected books chapters
        // else use the most recently clicked book's chapters
        if(book && book !== "") {
            setNumChapters(newTestamentMetadata[book].numChapters);
        }
        else if(book === "") {
            setNumChapters(0);
        }
        else if(bookChapter.book && bookChapter.book !== "") {
            setNumChapters(newTestamentMetadata[bookChapter.book].numChapters);
        }
        else
        {
            setNumChapters(0);
        }
    }, [book])


    let chapters : any[]  = [];


    function onChapterClick(chapterNum : number) {

        const params = {
            book: book !== "" ? book : bookChapter.book,
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
                <Chapter chapterNum={(i+1)} onClick={onChapterClick} />
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
        >
            {numChapters > 0 ? chapters.map((chapter) => chapter) : ""}
        </Grid>
    )
}

export default Chapters;
import Grid from '@mui/material/Grid';
import { books as newTestamentMetadata } from "../../../applicationLogic/newTestamentMetadata";
import {useNavigate, createSearchParams } from "react-router-dom";
import useBookChapterParams from '../../../hooks/useBookChapterParams';


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

    const bookChapter = useBookChapterParams();
    const navigate = useNavigate();

    let numChapters;

    // If a book has been clicked, then use the selected books chapters
    // else use the most recently clicked book's chapters
    if(book && book !== "") {
        numChapters = newTestamentMetadata[book].numChapters;
    }
    else if(bookChapter.book && bookChapter.book !== "") {
        numChapters = newTestamentMetadata[bookChapter.book].numChapters;
    }
    else
    {
        numChapters = 0;
    }


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

    for(let i = 0; i < numChapters; i++) {

        let chapterElement = (
            <Chapter chapterNum={(i+1)} onClick={onChapterClick} />
        )

        chapters.push(chapterElement);
    }

    return (
        <Grid   
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        >
            {chapters.map((chapter) => chapter)}
        </Grid>
    )
}

export default Chapters;
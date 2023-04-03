import { useState, useEffect } from "react";
import {  NewFormattedVerse } from '../types';
import getChapterVerses from '../api';
import mapVerses from '../applicationLogic/generateVerses';

function useChapterVerseData( book: string, chapter: number)
{
    const [verses, setVerses] = useState([] as NewFormattedVerse[]);

    useEffect(() => {

        const fetchData = async () => {
            const data = await getChapterVerses(book, chapter);

            // console.log("test case expected results (mapVerses(data))");
            // console.log(JSON.stringify(mapVerses(data)))

            setVerses(mapVerses(data));
        }

        fetchData();
    
    }, [book, chapter]);

      return verses;

}

export default useChapterVerseData;
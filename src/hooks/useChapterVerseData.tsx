import { useState, useEffect } from "react";
import {  NewFormattedVerse } from '../types';
import getChapterVerses from '../api';
import mapVerses from '../components/Text/utils/generateVerses'

function useChapterVerseData( book: string, chapter: number)
{
    const [verses, setVerses] = useState([] as NewFormattedVerse[]);

    useEffect(() => {

        const fetchData = async () => {
            const data = await getChapterVerses(book, chapter);
            setVerses(mapVerses(data));
        }

        fetchData();
    
    }, [book, chapter]);

      return verses;

}

export default useChapterVerseData;
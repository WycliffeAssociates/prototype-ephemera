import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function useBookChapterParams()
{
    const { search } = useLocation();
    const [book, setBook] = useState("philemon"); // TODO: possibly change this default value
    const [chapter, setChapter] = useState(1);


    useEffect(() => {
      let queryString = search.split("?");
      queryString = queryString[1].split("&");
  
      queryString.forEach((param) => {
        let paramArr = param.split("=");
        let paramName = paramArr[0];
        let paramValue = paramArr[1];
  
        if(paramName === "book")
        {
          setBook(paramValue.replace("%20", " ").toLowerCase());
  
        }
  
        if(paramName === "chapter")
        {
          setChapter(parseInt(paramValue));
        }
      })
    }, [search]);

    return {book: book, chapter: chapter};
}

export default useBookChapterParams;
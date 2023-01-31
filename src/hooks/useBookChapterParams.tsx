import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {useNavigate, createSearchParams } from "react-router-dom";
import { books as newTestamentMetadata } from "../applicationLogic/newTestamentMetadata";


function validateBookChapter(book: string, chapter: string) : boolean {
  if(newTestamentMetadata[book] !== undefined) {
    let chapterNumber = parseInt(chapter)
    if(chapterNumber > 0 && chapter <= newTestamentMetadata[book].numChapters) {
      return true;
    }
  }
  return false;
}

function storeValidBookChapterParams(book: string, chapter: string) {
  if(validateBookChapter(book, chapter)) {

    let previousBookChapter = JSON.parse(localStorage.getItem("lastBookChapter") as string);
    if(previousBookChapter?.chapter !== chapter) {
      localStorage.setItem("lastBookChapter", JSON.stringify({"book": book, "chapter": chapter}));
    }
  }
}

export function useBookChapterParams() {
    const { search } = useLocation();
    const [book, setBook] = useState("");
    const [chapter, setChapter] = useState(1);
    const navigate = useNavigate()

    function setValidBookChapterParams(book: string, chapter: string) {
      
      if(validateBookChapter(book, chapter)) {
        const params = {
          book: book,
          chapter: chapter,
        };
      
        const options = {
            pathname: '/',
            search: `?${createSearchParams(params)}`,
        }
      
        navigate(options, { replace: true });
      }
    }

    function getBookChaptersParams() {
      return {book: book, chapter: chapter + ""};
    }

    useEffect(() => {
      if(search.length !== 0 && search !== undefined) {

        let queryString = search.split("?");
        queryString = queryString[1].split("&");
    
        queryString.forEach((param) => {
          let paramArr = param.split("=");
          let paramName = paramArr[0];
          let paramValue = paramArr[1];
    
          if(paramName === "book")
          {
            let book = paramValue.replace("%20", " ");
            book = paramValue.replace("+", " ")
            setBook(book);
          }
    
          if(paramName === "chapter")
          {
            setChapter(parseInt(paramValue));
          }
        });
      }
    }, [search]);

    useEffect(() => {
      storeValidBookChapterParams(book, chapter + "");
    }, [book, chapter]);

    return {"setValidBookChapterParams": setValidBookChapterParams, "getBookChaptersParams": getBookChaptersParams};
}


export default useBookChapterParams;
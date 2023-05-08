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
    const [refBook, setRefBook] = useState<string>();
    const [refVerse, setRefVerse] = useState<string>();
    const [refWord, setRefWord] = useState<string>();
    const [refChapter, setRefChapter] = useState<number>();
    const navigate = useNavigate()

    function setValidBookChapterParams(newBook: string, newChapter: string, newVerse?: string, referenceWord?: string, isReference?: boolean) {

      // NOTE: this is a hardcoded fix for a content issue found when 
      // examining Philemon's 1:24 "Demas". The entry for that word in the gwt repo
      // has a verse reference going to "Colossian", however, the en_ulb names the book "Colossians"
      if(newBook === "Colossian") {
        newBook = "Colossians";
      }
      
      if(validateBookChapter(newBook, newChapter)) {
        let params : any;

        if(!isReference) {
          params = {
            book: newBook,
            chapter: newChapter,
          };
        } else {
          let oldParams = getBookChaptersParams();

          params = {
            book: oldParams.book,
            chapter: oldParams.chapter,
            refbook: newBook,
            refchapter: newChapter,
            refverse: newVerse,
            refword: referenceWord,
          }
        }
      
        const options = {
            pathname: '/',
            search: `?${createSearchParams(params)}`,
        }
      
        navigate(options, { replace: true });
      }
    }


    function removeReferenceParams() {
      let params : any;

      let oldParams = getBookChaptersParams();
      params = {
        book: oldParams.book,
        chapter: oldParams.chapter,
      }
      
      const options = {
          pathname: '/',
          search: `?${createSearchParams(params)}`,
      }
    
      navigate(options, { replace: true });

      setRefBook(undefined);
      setRefChapter(undefined);
      setRefVerse(undefined);
      setRefWord(undefined);

    }


    function getBookChaptersParams() {
        return {book: book, chapter: chapter + "", refBook: refBook, refChapter: refChapter + "", refVerse: refVerse, refWord:  refWord};
    }


    useEffect(() => {
      if(search.length !== 0 && search !== undefined) {

        let queryString = search.split("?");
        queryString = queryString[1].split("&");
    
        queryString.forEach((param) => {
          let paramArr = param.split("=");
          let paramName = paramArr[0];
          let paramValue = paramArr[1];
    
          if(paramName === "book") {
            let book = paramValue.replace("%20", " ");
            book = paramValue.replace("+", " ")
            setBook(book);
          }
    
          if(paramName === "chapter") {
            setChapter(parseInt(paramValue));
          }

          if(paramName === "refbook") {
            let book = paramValue.replace("%20", " ");
            book = paramValue.replace("+", " ")
            setRefBook(book);
          }
    
          if(paramName === "refchapter") {
            setRefChapter(parseInt(paramValue));
          }

          if(paramName === "refverse") {
            setRefVerse(paramValue);
          }

          if(paramName === "refword") {
            setRefWord(paramValue);
          }
        });
      }

    }, [search]);

    useEffect(() => {
      storeValidBookChapterParams(book, chapter + "");
    }, [book, chapter]);

    return {"setValidBookChapterParams": setValidBookChapterParams, "getBookChaptersParams": getBookChaptersParams, "removeReferenceParams": removeReferenceParams};
}


export default useBookChapterParams;
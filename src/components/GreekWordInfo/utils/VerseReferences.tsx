import {useBookChapterParams} from '../../../hooks/useBookChapterParams';


interface VerseReferencesProps {
    references: string[];
}

export function VerseReferences({references} : VerseReferencesProps) {
    const {setValidBookChapterParams} = useBookChapterParams();

    function onVerseReferenceClick(verseReference: string) {
        let verseReferenceBook : string= "" + verseReference.match(/[a-zA-Z]+/);
        let verseReferenceChapter : string= "" + verseReference.match(/\d+/);

        setValidBookChapterParams(verseReferenceBook, verseReferenceChapter);
    }

    return (
        <>
            <p className="UnprocessedMarkdown">See:&nbsp;</p>
            {references.map((verseReference, idx : number) => {
                return (
                    <p 
                        key={`reference ${idx}`}
                        className="UnprocessedMarkdown" 
                        onClick={() => onVerseReferenceClick(verseReference)}
                    >{verseReference}&nbsp;</p>
                )
            })}
        </>
    )
}
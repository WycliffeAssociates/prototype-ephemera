import {useNavigate, createSearchParams } from "react-router-dom";

interface VerseReferencesProps {
    references: string[];
}

export function VerseReferences({references} : VerseReferencesProps) {
    const navigate = useNavigate();

    function onVerseReferenceClick(verseReference: string) {
        let verseReferenceBook : string= "" + verseReference.match(/[a-zA-Z]+/);
        let verseReferenceChapter : string= "" + verseReference.match(/\d+/);

        const params = {
            book: verseReferenceBook,
            chapter: verseReferenceChapter,
        }

        const options = {
            pathname: '/',
            search: `?${createSearchParams(params)}`,
        };
        navigate(options, { replace: true });
    }

    return (
        <>
            <p className="UnprocessedMarkdown">See:&nbsp;</p>
            {references.map((verseReference) => {
                return (
                    <p className="UnprocessedMarkdown" onClick={() => onVerseReferenceClick(verseReference)}>{verseReference}&nbsp;</p>
                )
            })}
        </>
    )
}
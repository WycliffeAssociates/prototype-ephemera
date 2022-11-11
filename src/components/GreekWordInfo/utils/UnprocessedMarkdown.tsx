import ReactMarkdown from 'react-markdown'


interface unprocessedMarkdownProps {
    markdown: string
};

function UnprocessedMarkdown({markdown} : unprocessedMarkdownProps) {

    if(markdown !== undefined)
    {
        return (
            <>
                <ReactMarkdown children={markdown} components={{
                    ul: ({node, ...props}) => <ul style={{marginTop:"0px", paddingInlineStart: "25px",}}>{props.children}</ul>,
                    li: ({node, ...props}) => <li><p className="GreekWordInfoSubCategoryValue">{props.children} </p></li>,
                    p: ({node, ...props}) => <p className="GreekWordInfoSubCategoryValue">{props.children}</p>
                }}/>
            </>
        )
    }
    else
    {
        return (<></>)
    }

}


export default UnprocessedMarkdown;
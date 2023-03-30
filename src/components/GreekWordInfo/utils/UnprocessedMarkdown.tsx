import ReactMarkdown from 'react-markdown'
import { useSettings } from '../../../hooks/SettingsContext';
import { mapValidGWTSettings } from './mapValidGWTSettings';

interface unprocessedMarkdownProps {
    markdown: string
};

function UnprocessedMarkdown({markdown} : unprocessedMarkdownProps) {
    const { GWTSettings } = useSettings();
    let overwriteStyle : any = mapValidGWTSettings(GWTSettings);

    if(markdown !== undefined)
    {
        return (
            <div style={{paddingTop:"15px", paddingBottom:"15px"}}>
                <ReactMarkdown children={markdown} components={{
                    ul: ({node, ...props}) => <ul style={{marginTop:"0px", paddingInlineStart: "25px",}}>{props.children}</ul>,
                    li: ({node, ...props}) => <li><p className="GreekWordInfoSubCategoryValue">{props.children} </p></li>,
                    p: ({node, ...props}) => <p className="GreekWordInfoSubCategoryValue" style={{...overwriteStyle}}>{props.children}</p>
                }}/>
            </div>
        )
    }
    else
    {
        return (<></>)
    }

}


export default UnprocessedMarkdown;
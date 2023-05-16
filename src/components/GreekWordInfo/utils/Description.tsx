import Grid from '@mui/material/Grid';
import { Description as DescriptionType } from '../../../types';
import { useSettings } from '../../../hooks/SettingsContext';
import { mapValidGWTSettings } from './mapValidGWTSettings';


interface descriptionProps {
    descriptions: DescriptionType[] | undefined,
    showMore?: boolean,
};

function Description({descriptions, showMore} : descriptionProps) {
  const { GWTSettings } = useSettings();
  let overwriteStyle : any = mapValidGWTSettings(GWTSettings);

  if(descriptions !== undefined && descriptions.length > 0)
  {
    return (
      <>
        <Grid item sm={12} xs={12}>

          {showMore === true || showMore === undefined ? 
            <p className="GreekWordInfoSubCategory" 
                style={{...overwriteStyle}}
            >What does this word mean?</p>
          :""}
          
        </Grid>

        <Grid item sm={12} xs={12}>
          <ul className="GreekWordInfo__bulletPoint">

            {descriptions.map((description, idx : number) => {
              return (
                        <li key={`description ${idx}`}>
                          <p className="GreekWordInfoSubCategoryValue" 
                             style={{...overwriteStyle}}
                          >
                            {description.mainDescription}
                            {description?.subDescriptions?.map((subDescriptions, subDescriptionIdx : number) => {
                              return (
                                        <ul key={`sub description ${subDescriptionIdx}`}>
                                          <li>
                                            <p 
                                              className="GreekWordInfoSubCategoryValue" 
                                              style={{...overwriteStyle}}
                                            >
                                              {subDescriptions}
                                            </p>
                                          </li>
                                        </ul>
                                      )
                            })}
                          </p>
                        </li>
                      )
            })}
          </ul>
        </Grid>
      </>
    )
  }
  else
  {
    return (<></>)
  }
    
}


export default Description;
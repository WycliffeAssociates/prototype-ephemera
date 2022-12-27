import Grid from '@mui/material/Grid';
import { Description as DescriptionType } from '../../../types';
import { useSettings } from '../../../hooks/SettingsContext';
import { mapValidGWTSettings } from './mapValidGWTSettings';


interface descriptionProps {
    descriptions: DescriptionType[] | undefined
};

function Description({descriptions} : descriptionProps) {
  const { GWTSettings } = useSettings();
  let overwriteStyle : any = mapValidGWTSettings(GWTSettings);

  if(descriptions !== undefined && descriptions.length > 0)
  {
    return (
      <>
        <Grid item sm={12} xs={12}>
          <p className="GreekWordInfoSubCategory" 
             style={{...overwriteStyle}}
          >Description</p>
        </Grid>

        <Grid item sm={12} xs={12}>
          <ul style={{marginTop:"0px", paddingInlineStart: "25px",}}>

            {descriptions.map((description) => {
              return (
                        <li>
                          <p className="GreekWordInfoSubCategoryValue" 
                             style={{...overwriteStyle}}
                          >
                            {description.mainDescription}
                            {description?.subDescriptions?.map((subDescriptions) => {
                              return (
                                        <ul>
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
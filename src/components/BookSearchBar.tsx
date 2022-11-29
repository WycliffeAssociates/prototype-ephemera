import Grid from '@mui/material/Grid';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import SearchIcon from '@material-ui/icons/Search';
import {useState} from 'react';
import Input from '@mui/material/Input';


interface BookSearchBarProps {
  onClick: (params: any) => any,
  onFilter: (params: any) => any,
  onValidation: (searchValue: any) => boolean
}

function BookSearchBar( {onClick, onFilter, onValidation} : BookSearchBarProps)
{

  const [userInput, setUserInput] = useState("Search books");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if(onValidation !== undefined) {
      onValidation(event.target.value);
    }
    onFilter(event.target.value)
    setUserInput(event.target.value);
  };

  return (

    <Grid 
      className="BookSearchBar" 
      container direction="row" 
      justifyContent={{lg: "center", md: "center", sm:"flex-start"}} 
      alignItems="flex-start"
    >
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <ButtonGroup 
          className='BookSearchBar__ButtonGroup' 
          variant="outlined" aria-label="outlined button group" 
          style={{borderRadius:"25px 25px 25px 25px"}} 
        >
                <Input
                  onClick={() => setUserInput("")}
                  value={userInput}
                  onChange={handleChange} 
                  disableUnderline={true} 
                  defaultValue={userInput} 
                  style={{
                      width:"85%", 
                      paddingLeft:"15px", 
                      borderColor:"#d9d9d9", 
                      borderRadius:"25px 0px 0px 25px" 
                  }} 
                />
          <Button 
            onClick={() => onClick(userInput)} 
            style={{
                width:"15%", 
                borderColor:"#f2f2f2", 
                borderLeftColor:"#f2f2f2", 
                borderRadius:"0px 25px 25px 0px"}}
          >
            <span className="ChapterNavigationBar__Span">
                <SearchIcon style={{color:"#001A3D99"}}/>
            </span>
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  )
}


export default BookSearchBar;
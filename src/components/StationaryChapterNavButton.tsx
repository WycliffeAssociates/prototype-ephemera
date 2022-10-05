import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


interface ButtonProps {
    // 👇️ turn off type checking
    onTextClick: () => any;
  }
  function StationaryChapterNavButton({children}: any)
  {
    return (
      <Box style={{height:"100%"}} display={{ xs: 'none', sm: 'none', md:"block", lg:"block", xl:"block" }}>
        {/* <Item  style={{height:"100%"}}>  */}
          <Button style={{
            maxWidth: '40px', 
            maxHeight: '104px', 
            minWidth: '40px', 
            minHeight: '104px',
            top:"40%",  
            backgroundColor:"#f2f2f2",
            border: '0.5px solid',
            borderColor: "#d9d9d9",
            // float: "left" // or right for right button
            }}
            onClick={() => {console.log("onClickHere");} }
          >{children}</Button>
        {/* </Item> */}
      </Box>
    )
  }

  export default StationaryChapterNavButton;
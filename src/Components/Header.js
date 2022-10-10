import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { AddNewList } from './AddNewList';

export const Header = ({title, addNewList}) => {
  return (
    <Box sx={{ flexGrow: 1, mb: "2%"}} color={"primary"} >
      <AppBar position="static" sx={{p:"1%"}}>
        <Toolbar>
          <Typography variant="h4" fontWeight='bold' align="left" component="div" sx={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <AddNewList addNewList={addNewList}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
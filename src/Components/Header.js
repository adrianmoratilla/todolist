import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { AddNewList } from './AddNewList';
import logo from './TareApp Logo.png'


export const Header = ({title, addNewList}) => {
  return (
    <Box sx={{ flexGrow: 1, mb: "2%"}} color={"primary"} >
      <AppBar position="static" sx={{p:"1%"}}>
        <Toolbar sx={{justifyContent: "space-between"}}>
            <img src={logo} height={"50px"}></img>
          <AddNewList addNewList={addNewList}/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
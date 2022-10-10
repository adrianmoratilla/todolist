import { IconButton } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const AddNewList = ({addNewList}) => {

    return(
        <>
            <IconButton
                variant='outlined' 
                type="submit"
                onClick={addNewList}
                color={"white"}
                size="large"
            >
                {<AddCircleOutlineIcon fontSize="inherit"/>}
            </IconButton>
        </>
    )
}
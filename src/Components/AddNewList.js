import { Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const AddNewList = ({addNewList}) => {

    return(
        <>
            <Button
                variant='outlined' 
                type="submit"
                onClick={addNewList}
                color={"secondary"}
                
            >
                {<AddCircleOutlineIcon/>}
            </Button>
        </>
    )
}
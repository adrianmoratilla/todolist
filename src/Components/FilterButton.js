import { Button } from '@mui/material';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import AssignmentLateOutlinedIcon from '@mui/icons-material/AssignmentLateOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';

export function FilterButton(props) {

  function icon(name) {

    switch (name) {
      case 'Terminadas':
        return <AssignmentTurnedInOutlinedIcon/>;
        break;
      case 'Pendientes':
          return <AssignmentLateOutlinedIcon/>;
          break
      default:
       return <AssignmentOutlinedIcon/>;
        break;
      }
  }

    return (
      <Button
        variant={props.isPressed ? 'contained': 'outlined'}
        startIcon={icon(props.name)}
        color="secondary"
        type="button"
        className="btn toggle-btn"
        aria-pressed={props.isPressed}
        sx={{marginRight:1, marginLeft:1, marginTop:2}}
        onClick={() => props.setFilter(props.name)}
      >
        {/* <span className="visually-hidden">Show</span> */}
        <span>{props.name}</span>
        {/* <span className="visually-hidden">Tasks</span> */}
      </Button>
    );
  }
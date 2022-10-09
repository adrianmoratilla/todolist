import { Button } from '@mui/material';

export function FilterButton(props) {
    return (
      <Button
        variant='outlined'
        type="button"
        className="btn toggle-btn"
        aria-pressed={props.isPressed}
        sx={{mr:1, ml:1}}
        onClick={() => props.setFilter(props.name)}
      >
        {/* <span className="visually-hidden">Show</span> */}
        <span>{props.name}</span>
        {/* <span className="visually-hidden">Tasks</span> */}
      </Button>
    );
  }
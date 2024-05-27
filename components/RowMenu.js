import {useState} from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";

const RowMenu = () => {
  return function RowMenu({customerId}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleAction = (action) => {
      console.log(`Action: ${action} on customer ID: ${customerId}`);
      handleClose();
    };

    return (
      <div>
        <IconButton
          size="small"
          color="inherit"
          aria-controls={open ? "row-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          <MoreHorizRoundedIcon />
        </IconButton>
        <Menu
          id="row-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "row-menu-button",
          }}
        >
          <MenuItem onClick={() => handleAction("edit")}>Edit</MenuItem>
          <MenuItem onClick={() => handleAction("rename")}>Rename</MenuItem>
          <MenuItem onClick={() => handleAction("move")}>Move</MenuItem>
          <MenuItem onClick={() => handleAction("delete")}>Delete</MenuItem>
        </Menu>
      </div>
    );
  };
};

export default RowMenu;

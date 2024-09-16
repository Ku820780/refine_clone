import React from "react";
import { Menu, MenuItem, Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/EndPoints";
import { setUser } from "../../Redux/authSlice"; // Import your action
import ViewProfile from "../auth/ViewProfile";

export default function ProfileIcons() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`,{
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null)); // Dispatch the logout action
        navigate("/");
        toast.success("Logged out successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <img
          src={`http://localhost:5400/Images/${user?.profile}`}
          alt="/"
          style={{ width: "40px", height: "40px", borderRadius: "50%" }}
        />
      </Button>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {!user ? (
          <>
            <MenuItem onClick={handleClose}>
              <Link to="/register">Register</Link>
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Link to="/login">Login</Link>
            </MenuItem>
          </>
        ) : (
          <>
          <ViewProfile />
          <MenuItem onClick={handleLogout}>Log out</MenuItem>
         </>
         )}
      </Menu>
    </div>
  );
}

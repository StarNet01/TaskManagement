import { AccountCircle } from "@mui/icons-material";
import {
  Toolbar,
  AppBar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { store } from "store/Store";
import { logout } from "store/user/UserSlice";
import { useAppDispatch } from "hooks/useAppDispatch";
import useLocalStorage from "hooks/useLocalStorage";
import IUser from "interface/IUser";

const TopBar = () => {
  const user = store.getState().user;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dispatch = useAppDispatch();
  const [, setToken] = useLocalStorage<string>("token", "");
  const [, setUserData] = useLocalStorage<IUser>("user", {} as IUser);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            سیستم مدیریت تسک
          </Typography>
          {!!user.token && (
            <div>
              {user.user && (
                <Typography variant="subtitle1" component="span">
                  {user.user.email || ""}
                </Typography>
              )}
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  onClick={() => {
                    setToken("");
                    setUserData({} as IUser);
                    dispatch(logout());
                  }}
                >
                  خروج از حساب کاربری
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default TopBar;

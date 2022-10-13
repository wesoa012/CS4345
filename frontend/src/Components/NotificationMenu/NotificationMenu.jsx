import React from "react";
import { useEffect, useState } from "react"

import IconButton from '@mui/material/IconButton';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Typography from '@mui/material/Typography';
import { Menu, MenuItem } from "@mui/material";
import Tooltip from '@mui/material/Tooltip';



export const NotificationMenu = (props) => {

    const [anchorElNoti, setAnchorElNoti] = React.useState(null);

    const handleOpenNotiMenu = (event) => {
        setAnchorElNoti(event.currentTarget);
    };
    const handleCloseNotiMenu = () => {
        setAnchorElNoti(null);
    };

    return (<div className="NotificationMenu">
        <Tooltip title="Open notifications">
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="notifications-menu"
            aria-haspopup="true"
            onClick={handleOpenNotiMenu}
            color="inherit"

        >
            <NotificationsIcon />
        </IconButton>
        </Tooltip>
        <Menu
            id="notifications-menu"
            anchorEl={anchorElNoti}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={Boolean(anchorElNoti)}
            onClose={handleCloseNotiMenu}
        >
            {props.notifications.map((notification) => (
                <MenuItem key={notification.header} onClick={() => {props.openNotification(notification); handleCloseNotiMenu();}}>
                    <Typography textAlign="center">{notification.header}</Typography>
                </MenuItem>
            ))}

        </Menu>

    </div>)
}
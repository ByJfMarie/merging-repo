import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Avatar as MuiAvatar, Badge, Box, Button, IconButton, List, ListItem, ListItemAvatar, ListItemText, Popover as MuiPopover, SvgIcon, Tooltip, Typography, } from "@mui/material";
import { Bell, Home, UserPlus, Server } from "react-feather";
import { useTheme } from '@emotion/react';


function NotificationsDropdown() {

    const theme = useTheme();

    const Popover = styled(MuiPopover)`
  .MuiPaper-root {
    width: 300px;
    border: 1px solid ${theme.palette.menu.border};
  }
`;

    const Indicator = styled(Badge)`
  .MuiBadge-badge {
    background: #ff1744;
    color: #fff;
  }
`;

    const Avatar = styled(MuiAvatar)`
  background: #fff;
`;

    const NotificationHeader = styled(Box)`
  text-align: center;
  border-bottom: 1px solid ${theme.palette.menu.border};
`;


    const ref = useRef(null);
    const [isOpen, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Notification = ({ title, description, Icon }) => {
        return (
            <ListItem divider component={Link} to="#">
                <ListItemAvatar>
                    <Avatar style={{ backgroundColor: theme.palette.avatar.background }}>
                        <SvgIcon fontSize="small">
                            <Icon />
                        </SvgIcon>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={title}
                    primaryTypographyProps={{
                        variant: "subtitle2",
                        color: "textPrimary",
                    }}
                    secondary={description}
                />
            </ListItem>
        );
    }

    return (
        <React.Fragment>
            <Tooltip title="Notifications">
                <IconButton color="inherit" ref={ref} onClick={handleOpen}>
                    <Indicator badgeContent={7}>
                        <Bell />
                    </Indicator>
                </IconButton>
            </Tooltip>
            <Popover
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                anchorEl={ref.current}
                onClose={handleClose}
                open={isOpen}
            >
                <NotificationHeader p={2} style={{ backgroundColor: theme.palette.card.color }}>
                    <Typography variant="subtitle1" color="textPrimary">
                        7 New Notifications
                    </Typography>
                </NotificationHeader>
                <React.Fragment>
                    <List disablePadding style={{ backgroundColor: theme.palette.card.color }}>
                        <Notification
                            title="Update complete"
                            description="Restart server to complete update."
                            Icon={Server}
                        />
                        <Notification
                            title="New connection"
                            description="Anna accepted your request."
                            Icon={UserPlus}
                        />
                        <Notification
                            title="Lorem ipsum"
                            description="Aliquam ex eros, imperdiet vulputate hendrerit et"
                            Icon={Bell}
                        />
                        <Notification
                            title="New login"
                            description="Login from 192.186.1.1."
                            Icon={Home}
                        />
                    </List>
                    <Box p={1} display="flex" justifyContent="center" style={{ backgroundColor: theme.palette.card.color }}>
                        <Button size="small" component={Link} to="#">
                            Show all notifications
                        </Button>
                    </Box>
                </React.Fragment>
            </Popover>
        </React.Fragment>
    );
}

export default NotificationsDropdown;

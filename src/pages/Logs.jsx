import {
    Divider,
    Typography
} from "@mui/material"
import { useTheme } from '@emotion/react';
import * as React from "react";
import t from "../services/Translation";
import TableLogs from "../layouts/logs";

const Logs = () => {
    /** THEME AND CSS */
    //const Date = formatDate();
    const theme = useTheme();

    /*const typeButton = (
        <Grid item sm={4} xs={12} className={classes.left} style={{ display: "flex" }}>

            <Button variant="outlined" size="medium" className={classes.buttonMain} onClick={handleClick}>
                Type
                <ArrowDropDownIcon />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>ALL</MenuItem>
                <MenuItem onClick={handleClose}>Media Burner</MenuItem>
                <MenuItem onClick={handleClose}>DICOM Server</MenuItem>
                <MenuItem onClick={handleClose}>Transfer</MenuItem>
                <MenuItem onClick={handleClose}>Autoloader</MenuItem>
            </Menu>
        </Grid>
    )*/

    return (
        <React.Fragment>
            <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('logs')} </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <TableLogs
                page="logs"
                autoRefresh={false}
            />

    
        </React.Fragment>
    )
}
export default Logs
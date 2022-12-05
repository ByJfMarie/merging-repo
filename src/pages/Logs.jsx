import {
    Box,
    Divider, Grid,
    Typography
} from "@mui/material"
import { useTheme } from '@emotion/react';
import * as React from "react";
import TableLogs from "../layouts/logs";
import DescriptionIcon from '@mui/icons-material/Description';

/** Translation */
import { useTranslation } from 'react-i18next';

const Logs = () => {
    const { t } = useTranslation('common');

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
            <Typography
                variant="h4"
                style={{ textAlign: 'left', color: theme.palette.primary.main }}
            >
                <Grid container direction="row" alignItems="center">
                <i class="fi fi-rr-document text-2xl"></i> <Box sx={{ m: 0.5 }} /> {t('titles.logs')}
                </Grid>
            </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <TableLogs
                page="logs"
                autoRefresh={false}
            />

    
        </React.Fragment>
    )
}
export default Logs
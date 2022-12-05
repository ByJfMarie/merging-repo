import React from 'react';
import {Card, Button, CardContent, Grid} from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import TableForwarding from "../../../layouts/settings/forwarding";
import DialogAddEdit from "../../../layouts/settings/forwarding/DialogAddEdit";

/** Translation */
import { useTranslation } from 'react-i18next';

export default function Storage() {
    const { t } = useTranslation('system');

    const theme = useTheme();
    const useStyles = makeStyles({
        card: {
            padding: "20px",
            margin: "20px 0px",
            backgroundColor: theme.palette.card.color + "!important"
        },
        field: {
            width: '100%'
        },
        tableCell: {
            padding: "0px 16px !important",
            height: "50px !important",
            borderColor: theme.palette.textfield.border + " !important",
        },
        hover: {
            "&:hover": {
                transition: '0.3s',
                backgroundColor: theme.palette.table.hover + "! important"
            },
            height: "50px ! important",
            backgroundColor: theme.palette.textfield.background + "! important"
        },
        button: {
            color: theme.palette.text.primary,
            float: 'right',
            backgroundColor: theme.palette.chip.color + "!important",
            marginRight: '10px !important'
        },

    });
    const classes = useStyles();

    /** ADD/EDIT POP UP */
    const [showDialog, setShowDialog] = React.useState(false);
    const [settingsValue, setSettingsValue] = React.useState(null);
    const toggleDialog = () => {setShowDialog(!showDialog);}

    /** FORCE REFRESH */
    const [forceRefresh, setForceRefresh] = React.useState(false);

    return (
        <>
            <Card className={classes.card} style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
                <CardContent>
                    <Grid container style={{ marginBottom: '15px' }}>
                        <Grid item xs />

                        <Grid item className={classes.userNameGrid}>
                            <Button variant="contained" component="label" onClick={toggleDialog}>+ {t('tab_forwarding.actions.add')}</Button><br />
                        </Grid>
                    </Grid>

                    <TableForwarding
                        filters={null}
                        forceRefresh={forceRefresh}
                        edit={(values) => {setSettingsValue(values); toggleDialog();}}
                    />
                </CardContent>
            </Card>

            <DialogAddEdit
                values={settingsValue}
                setValues={setSettingsValue}
                isOpen={showDialog}
                toggle={toggleDialog}
                onSave={() => {setForceRefresh(!forceRefresh);}}
            />
        </>
    )
}


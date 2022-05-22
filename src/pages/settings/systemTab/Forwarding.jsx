import React from 'react';
import { Card, Button, CardContent, Grid, TextField, Dialog, Slide } from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../../services/Translation";
import TableForwarding from "../../../components/settings/forwarding/Table";
import DialogAddEdit from "../../../components/settings/forwarding/DialogAddEdit";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Storage() {
    const theme = useTheme();
    const useStyles = makeStyles({
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
            <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '25px 0px', margin : '0px 0px' }}>
                <CardContent>
                    <Grid container style={{ marginBottom: '15px' }}>
                        <Grid item xs />

                        <Grid item className={classes.userNameGrid}>
                            <Button variant="contained" component="label" onClick={toggleDialog}>+ {t('add')}</Button><br />
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
                isOpen={showDialog}
                toggle={toggleDialog}
                onSave={() => {setForceRefresh(!forceRefresh);}}
            />
        </>
    )
}


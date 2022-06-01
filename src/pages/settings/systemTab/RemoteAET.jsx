import React from 'react';
import {Card, CardContent, FormGroup, FormControlLabel, Checkbox, Button, Grid, Alert, Snackbar} from '@mui/material';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import t from "../../../services/Translation";
import DialogAddEdit from "../../../components/settings/aets/DialogAddEdit";
import TableAets from "../../../components/settings/aets/Table";
import AETSettings from "../../../services/api/settings.service";
import SettingsService from "../../../services/api/settings.service";

export default function RemoteAET() {
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

    /** MESSAGES */
    const [message, setMessage] = React.useState({
        show: false,
        severity: "info",
        message: ""
    });

    const [config, setConfig] = React.useState({});
    const refresh = async () => {
        const response = await AETSettings.getRemoteAET();

        if (response.error) {
            console.log(response.error);
            return;
        }

        setConfig(response.items);
    }
    React.useEffect(() => {
        refresh();
    }, []);

    const getSettingsValue = (id) => {
        if (!config[id]) return '';
        return config[id]['value'] || '';
    }
    const handleSettingsChange = (id, value) => {
        let cfg = config[id];
        if (!cfg) return;
        cfg['value'] = value;
        setConfig({...config, [id]: cfg});
        handleSave();
    }

    const handleSave = async () => {
        const response = await SettingsService.saveRemoteAET(config);

        if (response.error) {
            console.log(response.error);
            return;
        }

        refresh();
    };

    /** ADD/EDIT POP UP */
    const [showDialog, setShowDialog] = React.useState(false);
    const [settingsValue, setSettingsValue] = React.useState(null);
    const toggleDialog = () => {
        setShowDialog(!showDialog);
    }

    /** FORCE REFRESH */
    const [forceRefresh, setForceRefresh] = React.useState(false);

    return (
        <>
            <Snackbar open={message.show} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={() => {setMessage({...message, show: !message.show})}}>
                <Alert onClose={() => {setMessage({...message, show: !message.show})}} severity={message.severity} sx={{ width: '100%' }}>
                    {message.message}
                </Alert>
            </Snackbar>
            <Card style={{
                backgroundColor: theme.palette.card.color,
                width: "100% !important",
                padding: '25px 0px',
                margin: '0px 0px'
            }}>
                <CardContent>
                    <Grid container style={{marginBottom: '15px'}}>
                        <Grid item className={classes.userNameGrid}>
                            <FormGroup>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={getSettingsValue('DCMS.allow_all_scp')==="true"}
                                            onChange={(e) => handleSettingsChange('DCMS.allow_all_scp', e.target.checked+"")}
                                        />
                                    }
                                    label={t("allow_all_remote_server")}/>
                            </FormGroup>
                        </Grid>

                        <Grid item xs/>

                        <Grid item className={classes.userNameGrid}>
                            <Button variant="contained" component="label" onClick={toggleDialog}>+ Add</Button><br/>
                        </Grid>
                    </Grid>

                    <TableAets
                        filters={null}
                        forceRefresh={forceRefresh}
                        edit={(values) => {
                            setSettingsValue(values);
                            toggleDialog();
                        }}
                        alertMessage={(message) => setMessage(message)}
                    />
                </CardContent>
            </Card>

            <DialogAddEdit
                values={settingsValue}
                setValues={setSettingsValue}
                isOpen={showDialog}
                toggle={toggleDialog}
                onSave={() => {
                    setForceRefresh(!forceRefresh);
                }}
                alertMessage={(message) => setMessage(message)}
            />
        </>
    )
}
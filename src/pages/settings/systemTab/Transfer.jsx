import React from 'react';
import {Card, CardContent, Button, TextField, Grid, Alert, Snackbar} from '@mui/material';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import t from "../../../services/Translation";
import TableTransferRules from '../../../components/settings/transfer/Table';
import SettingsService from "../../../services/api/settings.service";
import TransferService from "../../../services/api/transfer.service";
import DialogAddEdit from "../../../components/settings/transfer/DialogAddEdit";
import ResetSave from "../../../components/settings/ResetSave";

export default function Transfer() {
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

    /** SETTINGS VALUES */
    const [config, setConfig] = React.useState({});
    const [remoteSites, setRemoteSites] = React.useState([]);
    const refresh = async () => {
        const response = await SettingsService.getTransfer();

        if (response.error) {
            console.log(response.error);
            return;
        }

        setConfig(response.items);
    }
    const refreshRemoteSites = async () => {
        const response = await TransferService.getRemoteSites();

        if (response.error) {
            console.log(response.error);
            return;
        }

        setRemoteSites(response.items);
    }
    React.useEffect(() => {
        refresh();
        refreshRemoteSites();
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
    }

    const handleTest = async () => {
        const response = await TransferService.testTransfer(config);

        if (response.error) {
            setMessage({
                ...message,
                show: true,
                severity: "error",
                message: response.error
            });
            return;
        }

        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: "Settings successfully saved!"
        });
    }

    const handleSave = async () => {
        const response = await SettingsService.saveTransfer(config);

        if (response.error) {
            setMessage({
                ...message,
                show: true,
                severity: "error",
                message: response.error
            });
            return;
        }

        refresh();
        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: "Settings successfully saved!"
        });
    };

    const handleCancel = () => {
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
            <Snackbar open={message.show} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}}
                      onClose={() => {
                          setMessage({...message, show: !message.show})
                      }}>
                <Alert onClose={() => {
                    setMessage({...message, show: !message.show})
                }} severity={message.severity} sx={{width: '100%'}}>
                    {message.message}
                </Alert>
            </Snackbar>
            <Card style={{backgroundColor: theme.palette.card.color, width: "100% !important", margin: '0px 0px'}}>
                <CardContent>
                    <Grid container spacing={2} style={{marginBottom: '15px'}}>
                        <Grid item xs={12}>
                            <TextField
                                style={{width: '100%'}}
                                id="DCMT.alias"
                                label={t("alias")}
                                variant="standard"
                                value={getSettingsValue('DCMT.alias')}
                                onChange={(e) => {
                                    handleSettingsChange('DCMT.alias', e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                style={{width: '100%'}}
                                id="DCMT.sftp_container"
                                label={t("working_folder_group")}
                                variant="standard"
                                value={getSettingsValue('DCMT.sftp_container')}
                                onChange={(e) => {
                                    handleSettingsChange('DCMT.sftp_container', e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                className={classes.field}
                                id="DCMT.sftp_host"
                                label={t("host")}
                                variant="standard"
                                value={getSettingsValue('DCMT.sftp_host')}
                                onChange={(e) => {
                                    handleSettingsChange('DCMT.sftp_host', e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <TextField
                                className={classes.field}
                                id="DCMT.sftp_port"
                                label={t("port")}
                                variant="standard"
                                value={getSettingsValue('DCMT.sftp_port')}
                                onChange={(e) => {
                                    handleSettingsChange('DCMT.sftp_port', e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                style={{width: '100%'}}
                                id="DCMT.sftp_user"
                                label={t("user")}
                                variant="standard"
                                value={getSettingsValue('DCMT.sftp_user')}
                                onChange={(e) => {
                                    handleSettingsChange('DCMT.sftp_user', e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                style={{width: '100%'}}
                                id="DCMT.sftp_password"
                                label={t("password")}
                                type="password"
                                variant="standard"
                                value={getSettingsValue('DCMT.sftp_password')}
                                onChange={(e) => {
                                    handleSettingsChange('DCMT.sftp_password', e.target.value)
                                }}
                            />
                        </Grid>
                    </Grid>
                    <ResetSave
                        handleTest={handleTest}
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </CardContent>
            </Card>
            <Card style={{backgroundColor: theme.palette.card.color, width: "100% !important", margin: '30px 0px'}}>
                <CardContent>
                    <Grid container spacing={2} style={{marginBottom: '15px'}}>
                        <Grid item xs/>
                        <Grid item>
                            <Button variant="contained" component="label" style={{marginTop: '15px'}}
                                    onClick={toggleDialog}>+ {t('add')}</Button>
                        </Grid>
                    </Grid>

                    <TableTransferRules
                        remoteSites={remoteSites}
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
                remoteSites={remoteSites}
                values={settingsValue}
                setValues={setSettingsValue}
                isOpen={showDialog}
                toggle={toggleDialog}
                onSave={() => {
                    setForceRefresh(!forceRefresh);
                }}
                alertMessage={(message) => setMessage(message)}
            />

        </>)
}
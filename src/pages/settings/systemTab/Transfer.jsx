import React from 'react';
import {Card, CardContent, Button, TextField, Grid, Alert, Snackbar} from '@mui/material';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import TableTransferRules from '../../../layouts/settings/transfer';
import SettingsService from "../../../services/api/settings.service";
import TransferService from "../../../services/api/transfer.service";
import DialogAddEdit from "../../../layouts/settings/transfer/DialogAddEdit";
import Index from "../../../layouts/settings/actions";

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../../translations/i18n";

export default function Transfer() {
    const { t } = useTranslation('settings');

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
                message: t("msg_error.transfer_test", {error: response.error})
            });
            return;
        }

        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: t("msg_info.transfer_test")
        });
    }

    const handleSave = async () => {
        const response = await SettingsService.saveTransfer(config);

        if (response.error) {
            setMessage({
                ...message,
                show: true,
                severity: "error",
                message: t("msg_error.settings_saved", {error: response.error})
            });
            return;
        }

        refresh();
        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: t("msg_info.settings_saved")
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
            <Card className={classes.card} style={{backgroundColor: theme.palette.card.color, width: "100% !important"}}>
                <CardContent>
                    <Grid container spacing={2} style={{marginBottom: '15px'}}>
                        <Grid item xs={12}>
                            <TextField
                                style={{width: '100%'}}
                                id="DCMT.alias"
                                label={t("fields.alias")}
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
                                label={t("fields.working_folder_group")}
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
                                label={t("fields.host")}
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
                                label={t("fields.port")}
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
                                label={t("fields.user")}
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
                                label={t("fields.password")}
                                type="password"
                                variant="standard"
                                value={getSettingsValue('DCMT.sftp_password')}
                                onChange={(e) => {
                                    handleSettingsChange('DCMT.sftp_password', e.target.value)
                                }}
                            />
                        </Grid>
                    </Grid>
                    <Index
                        handleTest={handleTest}
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </CardContent>
            </Card>
            <Card  className={classes.card} style={{backgroundColor: theme.palette.card.color, width: "100% !important"}}>
                <CardContent>
                    <Grid container spacing={2} style={{marginBottom: '15px'}}>
                        <Grid item xs/>
                        <Grid item>
                            <Button variant="contained" component="label" style={{marginTop: '15px'}}
                                    onClick={toggleDialog}>+ {t('buttons.add')}</Button>
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
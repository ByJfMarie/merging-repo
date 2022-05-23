import React from 'react';
import { Card, CardContent, Button, TextField, Grid, Dialog, Slide } from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../../services/Translation";
import TableTransferRules from '../../../components/settings/transfer/Table';
import SettingsService from "../../../services/api/settings.service";
import TransferService from "../../../services/api/transfer.service";
import DialogAddEdit from "../../../components/settings/transfer/DialogAddEdit";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

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

    const [config, setConfig] = React.useState({});
    const [remoteSites, setRemoteSites] = React.useState([]);
    const refresh = async() => {
        const response = await SettingsService.getTransfer();

        if (response.error) {
            console.log(response.error);
            return;
        }

        setConfig(response.items);
    }
    const refreshRemoteSites = async() => {
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

    /** ADD/EDIT POP UP */
    const [showDialog, setShowDialog] = React.useState(false);
    const [settingsValue, setSettingsValue] = React.useState(null);
    const toggleDialog = () => {setShowDialog(!showDialog);}

    /** FORCE REFRESH */
    const [forceRefresh, setForceRefresh] = React.useState(false);


    return (
        <><Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", margin: '0px 0px' }}>
            <CardContent>
                <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                    <Grid item xs={12}>
                        <TextField
                            style={{ width: '100%' }}
                            id="filled-basic"
                            label={t("alias")}
                            variant="standard"
                            value={config['DCMT.alias'] || ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            style={{ width: '100%' }}
                            id="filled-basic"
                            label={t("working_folder_group")}
                            variant="standard"
                            value={config['DCMT.sftp_container'] || ''}
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            className={classes.field}
                            id="filled-basic"
                            label={t("host")}
                            variant="standard"
                            value={config['DCMT.sftp_host'] || ''}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <TextField
                            className={classes.field}
                            id="filled-basic"
                            label={t("port")}
                            variant="standard"
                            value={config['DCMT.sftp_port'] || ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            style={{ width: '100%' }}
                            id="filled-basic"
                            label={t("user")}
                            variant="standard"
                            value={config['DCMT.sftp_user'] || ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            style={{ width: '100%' }}
                            id="filled-basic"
                            label={t("password")}
                            type="password"
                            variant="standard"
                            value={config['DCMT.sftp_password'] || ''}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
            <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", margin: '30px 0px' }}>
                <CardContent>
                    <Grid container spacing={2} style={{ marginBottom: '15px' }}>
                        <Grid item xs />
                        <Grid item >
                            <Button variant="contained" component="label" style={{ marginTop: '15px' }} onClick={toggleDialog}>+ {t('add')}</Button>
                        </Grid>
                    </Grid>

                    <TableTransferRules
                        remoteSites={remoteSites}
                        filters={null}
                        forceRefresh={forceRefresh}
                        edit={(values) => {setSettingsValue(values); toggleDialog();}}
                    />
                </CardContent>
            </Card>

            <DialogAddEdit
                remoteSites={remoteSites}
                values={settingsValue}
                isOpen={showDialog}
                toggle={toggleDialog}
                onSave={() => {setForceRefresh(!forceRefresh);}}
            />

        </>)
}
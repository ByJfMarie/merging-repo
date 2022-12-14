import React from 'react';
import {Card, CardContent, FormGroup, FormControlLabel, Checkbox, Button, Grid} from '@mui/material';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import DialogAddEdit from "../../../layouts/settings/aets/DialogAddEdit";
import TableAets from "../../../layouts/settings/aets";
import AETSettings from "../../../services/api/settings.service";
import SettingsService from "../../../services/api/settings.service";

/** Translation */
import { useTranslation } from 'react-i18next';

export default function RemoteAET() {
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
    const [settingsValue, setSettingsValue] = React.useState([]);
    const toggleDialog = () => {
        setShowDialog(!showDialog);
    }

    /** FORCE REFRESH */
    const [forceRefresh, setForceRefresh] = React.useState(false);

    return (
        <>
            <Card className={classes.card} style={{
                backgroundColor: theme.palette.card.color,
                width: "100% !important",
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
                                    label={t("tab_remote_servers.allow_all_remote_server")}/>
                            </FormGroup>
                        </Grid>

                        <Grid item xs/>

                        <Grid item className={classes.userNameGrid}>
                            <Button variant="contained" component="label" onClick={toggleDialog}>+ {t("tab_remote_servers.actions.add")}</Button><br/>
                        </Grid>
                    </Grid>

                    <TableAets
                        filters={null}
                        forceRefresh={forceRefresh}
                        edit={(values) => {
                            setSettingsValue(values);
                            toggleDialog();
                        }}
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
            />
        </>
    )
}
import React from 'react';
import {
    Typography,
    Divider,
    Card,
    CardContent,
    Grid,
    Alert, Snackbar, Box
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import RolesTable from "../../layouts/settings/roles";
import DialogAddEdit from "../../layouts/settings/roles/DialogAddEdit";
import ViewersService from "../../services/api/viewers.service";
import LockIcon from '@mui/icons-material/Lock';

/** Translation */
import { useTranslation } from 'react-i18next';
import "../../translations/i18n";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import PryInfo from "../../components/PryInfo";

/*const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});*/

const Roles = () => {
    const { t } = useTranslation('settings');

    /** THEME */
    const theme = useTheme();
    const useStyles = makeStyles({
        card: {
            padding: "20px",
            margin: "20px 0px",
            backgroundColor: theme.palette.card.color + "!important"
        }
    });
    const classes = useStyles();

    /** MESSAGES */
    const [message, setMessage] = React.useState({
        show: false,
        severity: "info",
        message: ""
    });

    /** ADD/EDIT POP UP */
    const [showDialog, setShowDialog] = React.useState(false);
    const [settingsValue, setSettingsValue] = React.useState(null);
    const [viewers, setViewers] = React.useState([]);
    const toggleDialog = () => {setShowDialog(!showDialog);}

    const refreshViewers = async () => {
        const response = await ViewersService.getViewers();

        if (response.error) {
            console.log(response.error);
            return;
        }

        setViewers(response.items);
    }
    React.useEffect(() => {
        refreshViewers();
    }, []);

    /** FORCE REFRESH */
    const [forceRefresh, setForceRefresh] = React.useState(false);

    return (
        <React.Fragment>

            <Typography
                variant="h4"
                style={{ textAlign: 'left', color: theme.palette.primary.main }}
            >
                <Grid container direction="row" alignItems="center">
                    <LockIcon fontSize="large"/> <Box sx={{ m: 0.5 }} /> {t('titles.roles_perm')}
                </Grid>
            </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <Snackbar open={message.show} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={() => {setMessage({...message, show: !message.show})}}>
                <Alert onClose={() => {setMessage({...message, show: !message.show})}} severity={message.severity} sx={{ width: '100%' }}>
                    {message.message}
                </Alert>
            </Snackbar>

            <PryInfo
                text={t("info.roles_perms")}
            />

            <Card className={classes.card} style={{ backgroundColor: theme.palette.card.color, width: "100% !important" }}>
                <CardContent>
                    <Grid container style={{ marginBottom: '15px' }}>
                        <Grid item xs />

                        {/*<Grid item className={classes.userNameGrid}>
                            <Button variant="contained" component="label" onClick={handleClickOpen}>+ {t('add')}</Button><br />
                        </Grid>*/}
                    </Grid>

                    <RolesTable
                        filters={null}
                        forceRefresh={forceRefresh}
                        edit={(values) => {setSettingsValue(values); toggleDialog();}}
                        alertMessage={(message) => setMessage(message)}
                    />
                </CardContent>
            </Card>

            <DialogAddEdit
                viewers={viewers}
                values={settingsValue}
                setValues={setSettingsValue}
                isOpen={showDialog}
                toggle={toggleDialog}
                onSave={() => {setForceRefresh(!forceRefresh);}}
                alertMessage={(message) => setMessage(message)}
            />

        </React.Fragment>
    )
}
export default Roles
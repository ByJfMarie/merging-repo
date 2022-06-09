import React from 'react';
import {
    Typography,
    Divider,
    Card,
    CardContent,
    Grid,
    Button,
    TextField,
    Dialog,
    Slide,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
    Alert, Snackbar
} from '@mui/material';
import { useTheme } from '@emotion/react';
import { makeStyles } from "@mui/styles";
import t from "../../services/Translation";
import RolesTable from "../../components/settings/roles/Table";
import DialogAddEdit from "../../components/settings/roles/DialogAddEdit";
import ViewersService from "../../services/api/viewers.service";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Roles = () => {
    /** THEME */
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

            <Typography variant="h4" style={{ textAlign: 'left', color: theme.palette.primary.main }} > {t('roles_perm')} </Typography>
            <Divider style={{ marginBottom: theme.spacing(2) }} />

            <Snackbar open={message.show} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={() => {setMessage({...message, show: !message.show})}}>
                <Alert onClose={() => {setMessage({...message, show: !message.show})}} severity={message.severity} sx={{ width: '100%' }}>
                    {message.message}
                </Alert>
            </Snackbar>

            <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '25px 0px', margin: '0px 0px' }}>
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
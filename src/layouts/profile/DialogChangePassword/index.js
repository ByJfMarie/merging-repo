import React, {forwardRef, useImperativeHandle, useRef} from "react";
import {
    Dialog, DialogActions,
    DialogContent,
    Slide,
} from "@mui/material";
import Index from "../../settings/actions";
import {useTranslation} from "react-i18next";
import {useTheme} from "@emotion/react";
import ChangePassword from "../../../pages/settings/ChangePassword";
import UsersService from "../../../services/api/users.service";
import { useSnackbar } from 'notistack';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DialogChangePassword = forwardRef((props, ref) => {

    const {t} = useTranslation('settings');

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const theme = useTheme();

    const [open, setOpen] = React.useState(false);

    const innerRef = useRef();

    useImperativeHandle(ref, () => ({
        openDialog: () => setOpen(true),
        closeDialog: () => setOpen(false)
    }));

    const [password, setPassword] = React.useState({});
    const handleSave = async () => {
        let response = await UsersService.changePassword(password);

        if (response.error) {
            enqueueSnackbar(t("msg_error.reset_password", {error: response.error}), {variant: 'error'});
            return;
        }

        setOpen(false);
        enqueueSnackbar(t("msg_info.reset_password"), {variant: 'success'});
    }
    const handleCancel = () => {
        setOpen(false);
        setPassword({});
    };

    return (
        <React.Fragment>
            <Dialog
                open={open}
                ref = {innerRef}
                fullWidth
                maxWidth="lg"
                onClose={handleCancel}
                scroll="paper"
                TransitionComponent={Transition}
            >
                <DialogContent dividers={true} style={{backgroundColor: theme.palette.dialog.color}}>
                    <ChangePassword
                        password={password}
                        setPassword={setPassword}
                    />
                </DialogContent>
                <DialogActions style={{backgroundColor: theme.palette.dialog.color}}>
                    <Index
                        labelReset={t('buttons.cancel')}
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
});

export default DialogChangePassword;
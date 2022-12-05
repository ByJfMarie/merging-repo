import {Button, Grid} from "@mui/material";
import * as React from "react";

/** Translation */
import { useTranslation } from 'react-i18next';

export default function SettingsActionsLayout(props) {
    const { t } = useTranslation('users');

    return (
        <Grid container spacing={2} direction={"row-reverse"} style={{ marginTop: '15px' }}>
            <Grid item xs="auto">
                <Button variant="contained" component="label" onClick={props.handleSave}>{t('actions.save')}</Button>
            </Grid>
            <Grid item xs="auto">
                <Button variant="outlined" component="label"
                        onClick={props.handleCancel}>{props.labelReset || t('actions.reset')}</Button>
            </Grid>
            <Grid item xs>
            </Grid>
            {
                props.handleTest &&

                <Grid item xs="auto">
                    <Button variant="outlined" color="success" component="label"
                            onClick={props.handleTest}>{t("actions.test_settings")}</Button>
                </Grid>
            }
        </Grid>
    );
}
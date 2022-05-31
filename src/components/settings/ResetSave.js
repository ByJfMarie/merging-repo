import {Button, Grid} from "@mui/material";
import t from "../../services/Translation";
import * as React from "react";

export default function ResetSave(props) {

    return (
        <Grid container spacing={2} direction={"row-reverse"} style={{ marginTop: '15px' }}>
            <Grid item xs="auto">
                <Button variant="contained" component="label" onClick={props.handleSave}>{t('save')}</Button>
            </Grid>
            <Grid item xs="auto">
                <Button variant="outlined" component="label"
                        onClick={props.handleCancel}>{t('reset')}</Button>
            </Grid>
            <Grid item xs>
            </Grid>
        </Grid>
    );
}
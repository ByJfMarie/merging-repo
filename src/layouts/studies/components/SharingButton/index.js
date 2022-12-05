import * as React from 'react';
import {useTheme} from "@emotion/react";
import {makeStyles} from "@mui/styles";
import {Button} from "@mui/material";
import ShareIcon from '@mui/icons-material/Share';

/** Translation */
import { useTranslation } from 'react-i18next';

const SharingButton = (props) => {
    const { t } = useTranslation('common');

    const theme = useTheme();

    const useStyles = makeStyles((theme) => ({
        button: {
            backgroundColor: theme.palette.button.background + "!important"
        }
    }));

    const classes = useStyles(theme);

    const handleClick = (event) => {
        props.sharingFunction();
    };
    /*const handleClose = () => {
    };*/



    return (
        <Button
            key={"sharing"}
            className={classes.button}
            variant="outlined"
            size="medium"
            color="primary"
            style={{ marginLeft: "10px" }}
            onClick={() => handleClick()}
            disabled={props.actionDisabled}
        >
            <ShareIcon fontSize="small" />
            {t('buttons.share')}
        </Button>
    )
}

export default SharingButton;
import * as React from 'react';
import { Grid } from "@mui/material";
import DownloadButton from "./DownloadButton";
import ForwardButton from "./ForwardButton";
import TransferButton from "./TransferButton";

import UserStorage from "../../services/storage/user.storage";

const TableLocalStudiesActions = (props) => {

    const privileges = UserStorage.getPrivileges();

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item sm={4} sx={{display: {xs: 'none', sm:'block'}}}>
                    {privileges.tables[props.page].actions.includes('download') && (
                        <DownloadButton
                            key='download'
                            downloadFunction={props.downloadFunction}
                        />
                    )}
                </Grid>
                <Grid item xs={12} sm={8}  >
                    <Grid container spacing={1} direction={"row-reverse"}>
                    {  // eslint-disable-next-line 
                        privileges.tables[props.page].actions.map((value, key) => {
                            if (value === "forward") {
                                return (
                                    <Grid key={value} item xs="auto">
                                        <ForwardButton
                                            forwardFunction={props.forwardFunction}
                                        />
                                    </Grid>
                                )
                            }
                            else if (value === "transfer") {
                                return (
                                    <Grid key={value} item xs="auto">
                                    <TransferButton
                                        transferFunction={props.transferFunction}
                                    />
                                    </Grid>
                                )
                            }
                            /*else if (value === "media") {
                                return (
                                    <Button
                                        key={value}
                                        className={classes.buttonMain}
                                        variant="outlined"
                                        size="medium"
                                        color="primary"
                                        style={{ marginLeft: "10px" }}
                                        onClick={() => {props.mediaFunction();}}
                                    >
                                        {t(value)}
                                    </Button>
                                )
                            }*/
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}

export default TableLocalStudiesActions;
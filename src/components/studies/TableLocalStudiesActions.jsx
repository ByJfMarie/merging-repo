import * as React from 'react';
import { Grid } from "@mui/material";
import AuthService from "../../services/api/auth.service";
import DownloadButton from "./DownloadButton";
import ForwardButton from "./ForwardButton";
import TransferButton from "./TransferButton";

const TableLocalStudiesActions = (props) => {

    const priviledges = AuthService.getCurrentUser().priviledges;

    return (
        <React.Fragment>
            <Grid container spacing={2}>
                <Grid item sm={4} sx={{display: {xs: 'none', sm:'block'}}}>
                    {priviledges.privileges.pages[props.page].searchTable.actionsTable.includes('download') && (
                        <DownloadButton
                            key='download'
                            downloadFunction={props.downloadFunction}
                        />
                    )}
                </Grid>
                <Grid item xs={12} sm={8}  >
                    <Grid container spacing={1} direction={"row-reverse"}>
                    {  // eslint-disable-next-line 
                        priviledges.privileges.pages[props.page].searchTable.actionsTable.map((value, key) => {
                            if (value === "forward") {
                                return (
                                    <Grid item xs="auto">
                                    <ForwardButton
                                        key={value}
                                        forwardFunction={props.forwardFunction}
                                    />
                                    </Grid>
                                )
                            }
                            else if (value === "transfer") {
                                return (
                                    <Grid item xs="auto">
                                    <TransferButton
                                        key={value}
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
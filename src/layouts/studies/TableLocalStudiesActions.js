import * as React from 'react';
import { Grid } from "@mui/material";
import DownloadButton from "./components/DownloadButton";
import ForwardButton from "./components/ForwardButton";
import TransferButton from "./components/TransferButton";
import UserContext from "../../components/UserContext";
import SharingButton from "./components/SharingButton";

const TableLocalStudiesActions = (props) => {

    /** User & privileges */
    const { privileges } = React.useContext(UserContext);

    return (
        <React.Fragment>
            <div className='laptop:hidden '>
            <div container spacing={0} className='flex justify-center mt-5' >
                <div >
                    {privileges.tables[props.page].actions.includes('download') && (
                        <DownloadButton                         
                            key='download'
                            downloadFunction={props.downloadFunction}
                            actionDisabled={props.actionDisabled}
                            
                        />
                    )}
                </div>
                <div  >
                    <div className='flex'>
                    {  // eslint-disable-next-line 
                        privileges.tables[props.page].actions.map((value, key) => {
                            if (value === "share") {
                                return (
                                    <div key={"sharing"} item xs="auto">
                                        <SharingButton
                                            sharingFunction={props.sharingFunction}
                                            actionDisabled={props.actionDisabled}
                                        />
                                    </div>
                                )
                            }
                            else if (value === "forward") {
                                return (
                                    <div key={value} item xs="auto">
                                        <ForwardButton
                                            forwardFunction={props.forwardFunction}
                                            actionDisabled={props.actionDisabled}
                                        />
                                    </div>
                                )
                            }
                            else if (value === "transfer") {
                                return (
                                    <div key={value} item xs="auto">
                                    <TransferButton
                                        transferFunction={props.transferFunction}
                                        actionDisabled={props.actionDisabled}
                                    />
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>
            </div>
            </div>

            <div className='hidden laptop:block'>
            <Grid container spacing={0} >
                <Grid item sm={4} >
                    {privileges.tables[props.page].actions.includes('download') && (
                        <DownloadButton                         
                            key='download'
                            downloadFunction={props.downloadFunction}
                            actionDisabled={props.actionDisabled}
                        />
                    )}
                </Grid>
                <Grid item xs={12} sm={8}  >
                    <Grid container spacing={1} direction={"row-reverse"}>
                    {  // eslint-disable-next-line 
                        privileges.tables[props.page].actions.map((value, key) => {
                            if (value === "share") {
                                return (
                                    <Grid key={"sharing"} item xs="auto">
                                        <SharingButton
                                            sharingFunction={props.sharingFunction}
                                            actionDisabled={props.actionDisabled}
                                        />
                                    </Grid>
                                )
                            }
                            else if (value === "forward") {
                                return (
                                    <Grid key={value} item xs="auto">
                                        <ForwardButton
                                            forwardFunction={props.forwardFunction}
                                            actionDisabled={props.actionDisabled}
                                        />
                                    </Grid>
                                )
                            }
                            else if (value === "transfer") {
                                return (
                                    <Grid key={value} item xs="auto">
                                    <TransferButton
                                        transferFunction={props.transferFunction}
                                        actionDisabled={props.actionDisabled}
                                    />
                                    </Grid>
                                )
                            }
                        })}
                    </Grid>
                </Grid>
            </Grid>
            </div>

          
        </React.Fragment>
    )
}

export default TableLocalStudiesActions;
import {TableRow, TableCell, Checkbox, Box, IconButton, Tooltip, Button, Menu, MenuItem} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useTheme} from '@emotion/react';
import React, {useEffect, useState} from "react";
import styled from "styled-components/macro";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import UpdateIcon from '@mui/icons-material/Update';

import StudiesService from "../services/api/studies.service";

export default function CustomTableRow(props) {

    /** THEME AND CSS */
    const theme = useTheme();
    const useStyles = makeStyles({
        hover: {
            "&:hover": {
                transition: '0.3s',
                backgroundColor: theme.palette.table.hover + "! important"
            },
            height: "50px ! important",
            backgroundColor: theme.palette.table.body + "! important"
        },
        tableCell: {
            //padding: "0px 16px !important",
            borderColor: theme.palette.table.line + " !important",
        },
        tableCellActions: {
            padding: "0px 0px !important",
            borderColor: theme.palette.table.line + " !important",
        },
        buttonIcon: {
            "&:hover": {
                transition: '0.3s',
                color: theme.palette.primary.main + "! important"
            },
        }
    });
    const classes = useStyles();

    /** CHECKBOX FUNCTIONS */
    useEffect(() => {
        setcheckboxState(props.checked)
    }, [props])

    const [checkboxState, setcheckboxState] = useState(props.checked)
    const handleChange = () => {
        setcheckboxState(!checkboxState)
    }

    /** THUMBNAIL IN A ROW */
    const Thumbnail = styled.div`
   display: flex;
   align-items: center !important;
 `;

    const [actionMenuAchorEl, setActionMenuAchorEl] = React.useState(null);
    const actionMenuOpen = Boolean(actionMenuAchorEl);
    const handleActionMenuClick = (event) => {
        setActionMenuAchorEl(event.currentTarget);
    };
    const handleActionMenuClose = (event) => {
        setActionMenuAchorEl(null);
    };
    const handleActionStudyInfo = (key) => {
        setActionMenuAchorEl(null);
        props.handleOpenDialogStudy(key)
    };
    const handleActionLoginSheet = async (key) => {
        setActionMenuAchorEl(null);

        const rsp = await StudiesService.openLoginSheet(key);
        if (rsp && rsp.data && rsp.data.size) {
            //Create a Blob from the PDF Stream
            const file = new Blob(
                [rsp.data],
                {type: 'application/pdf'});

            //Build a URL from the file
            const fileURL = URL.createObjectURL(file);

            //Open the URL on new Window
            window.open(fileURL);
        }
    };
    const handleActionAddReport = (key) => {
        setActionMenuAchorEl(null);
    };
    const handleActionAddPermission = (key) => {
        setActionMenuAchorEl(null);
        props.handleOpenDialoPermissions(key)
    };

    return (
        <>
            <TableRow
                hover
                classes={{hover: classes.hover}}
                key={props.name}
                sx={{'&:last-child td, &:last-child th': {border: 0}}}
            >
                <TableCell align="left" className={classes.tableCell}><Checkbox checked={checkboxState}
                                                                                onChange={handleChange}/></TableCell>

                {
                    Object.values(props.columns).map((col) => {

                        if (col === 'study') {
                            return (
                                <TableCell align="left" className={classes.tableCell}>
                                    <Thumbnail>

                                        <img src="" alt="thumbnail" style={{
                                            width: "50px",
                                            padding: "auto",
                                            display: 'inline-flex',
                                            margin: "5px 0 5px 0"
                                        }}/>
                                        <Box style={{paddingLeft: '15px'}}>
                                            {props.rows['st_date']+" - "+props.rows['st_accession_number']+" - "+props.rows['st_modalities']}<br/>
                                            {props.rows['st_description']}<br/>
                                            {props.rows['nb_series']+" series - "+props.rows['nb_images']+" image(s)"}
                                        </Box>
                                    </Thumbnail>
                                </TableCell>
                            )
                        }
                        else if (col === 'accession_number') {
                            return (<TableCell align="left" className={classes.tableCell}>{props.rows['st_accession_number']}
                            </TableCell>)
                        }
                        else if (col === "patient") {
                            return (<TableCell align="left" className={classes.tableCell}>{props.rows['p_name']+" ("+props.rows['p_id']+')'}<br/>{props.rows['p_birthdate']}
                            </TableCell>)
                        }
                        else if (col === "study_date") {
                            return (<TableCell align="left" className={classes.tableCell}>{props.rows['st_date']}</TableCell>)
                        }
                        else if (col === "description") {
                            return (<TableCell align="left" className={classes.tableCell}>{props.rows['st_description']}</TableCell>)
                        }
                        else if (col === "modality") {
                            return (<TableCell align="left" className={classes.tableCell}>{props.rows['st_modalities']+""}</TableCell>)
                        }
                        else if (col === "referring_physician") {
                            return (<TableCell align="left" className={classes.tableCell}>{props.rows['st_ref_physician']}</TableCell>)
                        }
                        else if (col === "facility") {
                            return (<TableCell align="left" className={classes.tableCell}>{props.rows['st_institution']}</TableCell>)
                        }
                        else if (col === "lite_viewer") {
                            return (<TableCell align="left" className={classes.tableCell}>{''}</TableCell>)
                        }
                        else if (col === "noi") {
                            return (<TableCell align="left" className={classes.tableCell}>{props.rows['nb_series']+" series - "+props.rows['nb_images']+" image(s)"}</TableCell>)
                        }
                        else if (col === "report") {
                            return (
                                <TableCell align="left" className={classes.tableCell}>
                                    {
                                        /*Object.values(reports).map((report) => {
                                            return (<IconButton onClick={() => handleDownloadReport(report.key)}><PictureAsPdfRoundedIcon fontSize="small"/></IconButton>)
                                        })*/
                                    }
                                </TableCell>
                            )
                        }
                        else if (col === "permissions") {
                            return (
                                <TableCell align="left" className={classes.tableCell}>
                                    {
                                        (props.rows['nb_shares']>0)
                                            ? <IconButton><ShortcutIcon fontSize="small"/></IconButton>
                                            : <IconButton><UpdateIcon fontSize="small"/></IconButton>
                                    }

                                    {
                                        (props.rows['nb_shares']>0)?(props.rows['nb_shares']+" share(s)"):"To be processed"
                                    }
                                </TableCell>
                            )
                        }
                    })
                }

                {props.actions.length !== 0 && (
                    <TableCell align="left" className={classes.tableCellActions} style={{padding: "0px !important"}}>
                        {props.actions.includes("view") && (
                            <>
                                <Tooltip title="View">
                                    <IconButton>
                                        <RemoveRedEyeIcon fontSize="small"/>
                                    </IconButton>
                                </Tooltip>
                            </>
                        )}

                        <Button
                            id="basic-button"
                            aria-controls={actionMenuOpen ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={actionMenuOpen ? 'true' : undefined}
                            onClick={handleActionMenuClick}
                            style={{ color: theme.palette.text.primary }}
                        >
                            <IconButton><MoreHorizIcon fontSize="small"/></IconButton>
                        </Button>
                        <Menu
                            id="actions_menu"
                            anchorEl={actionMenuAchorEl}
                            open={actionMenuOpen}
                            onClose={handleActionMenuClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={() => handleActionStudyInfo(props.rows)}>Study info</MenuItem>
                            <MenuItem onClick={() => handleActionLoginSheet(props.rows['key'])}>Login Sheet</MenuItem>
                            <MenuItem onClick={() => handleActionAddPermission(props.rows['key'])}>Set Permission</MenuItem>
                            <MenuItem onClick={() => handleActionAddReport(props.rows['key'])}>Add report</MenuItem>
                        </Menu>

                        {/* {props.actions.includes("delete") && (
          <>
            <Tooltip title="Delete">
              <IconButton>
                <DeleteIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>

        )}

        {props.actions.includes("info") && (
          <>
            <Tooltip title="info">
              <IconButton>
                <InfoIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        )} */}
                    </TableCell>
                )}

            </TableRow>
        </>
    )
}

/*
        <Thumbnail style={{display: 'inline-flex'}}> 
        <AccountCircleIcon style={{ transform: 'scale(1.2)' }} />
         <Box style={{ paddingLeft: '15px' }}> 
          
           <br/>
          Radio 
         </Box> 
      </Thumbnail> */
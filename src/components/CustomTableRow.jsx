import {TableRow, TableCell, Checkbox, Box, IconButton, Tooltip} from "@mui/material";
import {makeStyles} from "@mui/styles";
import {useTheme} from '@emotion/react';
import {useEffect, useState} from "react";
import styled from "styled-components/macro";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import ThumbnailsService from "../services/api/thumbnails.service";

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
            padding: "0px 16px !important",
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
        props.onChange(props.rows.id, !checkboxState)
    }

    /** THUMBNAIL IN A ROW */
    const Thumbnail = styled.div`
   display: flex;
   align-items: center !important;
 `;

    const [thumbnail, setThumbnail] = useState({})

    useEffect(() => {
        loadThumbnail(props.rows.id);
    }, []);

    const loadThumbnail = async (study_id) => {
        /** TEST TOKEN */
        /*const refreshResponse = await PryAPI.refreshToken();
        PryAPI.setRefreshToken(refreshResponse);*/

        const rsp = await ThumbnailsService.getThumbnailForStudy(study_id, 50);

        if (rsp && rsp.data && rsp.data.size) {
            const dataInfo = rsp.data;
            let reader = new window.FileReader();
            reader.readAsArrayBuffer(dataInfo);
            reader.onload = function (e) {
                const result = e.target.result;
                const contentType = dataInfo.type;
                //  Generate blob images, need parameters (byte arrays, file types)
                const blob = new Blob([result], {type: contentType});
                //  Create a URL that points to the type array using blob, url.createObjecturl is a method of new blob file, you can generate a normal URL, you can use it directly, such as in img.src
                const url = window.URL.createObjectURL(blob);

                setThumbnail(url);
            }
        }
    }

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

                {Object.keys(props.rows).map((row) => {

                    if (row === "study") {
                        return (
                            <TableCell align="left" className={classes.tableCell}>
                                <Thumbnail>
                                    <img src={thumbnail} alt="thumbnail" style={{
                                        width: "50px",
                                        padding: "auto",
                                        display: 'inline-flex',
                                        margin: "5px 0 5px 0"
                                    }}/>
                                    <Box style={{paddingLeft: '15px'}}>
                                        {props.rows[row]}
                                    </Box>
                                </Thumbnail>
                            </TableCell>
                        )
                    } else if (row !== "id") {
                        return (<TableCell align="left" className={classes.tableCell}>{props.rows[row]}</TableCell>)
                    }
                })}

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

                        <>
                            <Tooltip title="More">
                                <IconButton>
                                    <MoreHorizIcon fontSize="small"/>
                                </IconButton>
                            </Tooltip>
                        </>

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
import {
    Card,
    CardContent,
    TextField,
    Divider,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Grid, Alert, Snackbar, Typography, FormControl, FormLabel, RadioGroup, Select, MenuItem
} from '@mui/material';
import {useTheme} from '@emotion/react';
import {makeStyles} from "@mui/styles";
import * as React from "react";
import SettingsService from "../../../services/api/settings.service";
import Index from "../../../layouts/settings/actions";
import Radio from '@mui/material/Radio';
/** Translation */
import { useTranslation } from 'react-i18next';
import { Button } from 'devextreme-react';

const useStyles = makeStyles((theme) => ({
    card: {
        padding: "20px",
        margin: "20px 0px",
        backgroundColor: theme.palette.card.color + "!important"
    },
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
    label: {
        fontSize: '14px !important',
    }
}));

export default function LocalServer() {
    const { t } = useTranslation('settings');

    const theme = useTheme();
    const classes = useStyles(theme);

    /** MESSAGES */
    const [message, setMessage] = React.useState({
        show: false,
        severity: "info",
        message: ""
    });

    /** SETTINGS VALUES */
    const [settingsValue, setSettingsValue] = React.useState({});
    const refreshSettings = async () => {
        const response = await SettingsService.getLocalServer();

        if (response.error) {
            console.log(response.error);
            return;
        }

        if (response.items == null) return;
        setSettingsValue(response.items);
    }

    React.useEffect(() => {
        refreshSettings();
    }, []);

    const getSettingsValue = (id) => {
        if (!settingsValue[id]) return '';
        return settingsValue[id]['value'] || '';
    }
    const handleSettingsChange = (id, value) => {
        let cfg = settingsValue[id];
        if (!cfg) return;
        cfg['value'] = value;
        setSettingsValue({...settingsValue, [id]: cfg});
    }
    const handleSettingsTSChange = (id, value) => {
        let cfg = settingsValue['DCMS.accepted_ts'];
        if (!cfg) return;
        cfg['value'][id] = value;
        setSettingsValue({...settingsValue, ['DCMS.accepted_ts']: cfg});
    }

    const handleSave = async () => {
        const response = await SettingsService.saveLocalServer(settingsValue);

        if (response.error) {
            setMessage({
                ...message,
                show: true,
                severity: "error",
                message: t("msg_error.settings_saved", {error: response.error})
            });
            return;
        }

        refreshSettings();
        setMessage({
            ...message,
            show: true,
            severity: "success",
            message: t("msg_info.settings_saved")
        });
    };

    const handleCancel = () => {
        refreshSettings();
    };

    return (
        <>
            <Snackbar open={message.show} autoHideDuration={6000} anchorOrigin={{vertical: 'top', horizontal: 'center'}} onClose={() => {setMessage({...message, show: !message.show})}}>
                <Alert onClose={() => {setMessage({...message, show: !message.show})}} severity={message.severity} sx={{ width: '100%' }}>
                    {message.message}
                </Alert>
            </Snackbar>

            
            <div className="w-full flex items-center justify-between flex-wrap">
                
                <div className="w-1/5 h-44">
                    <Card className={classes.card} style={{backgroundColor: theme.palette.card.color, margin: '0px', height: '100%'}}>
                        <Typography variant="subtitle2" align="left">Download Specific Backup</Typography>
                        <Divider style={{marginBottom: '10px'}}/>
                        <div className="flex flex-col mt-4">
                            <h1 className='text-sm mr-4 ml-2 mb-3 text-gray-600 dark:text-gray-300'>Select backup</h1>
                            <Select className='h-6 border-none mx-2' sx={{borderStyle: 'none'}} defaultValue={1}>
                                <MenuItem value={1}>backup1</MenuItem>
                                <MenuItem value={2}>backup2</MenuItem>
                                <MenuItem value={3}>backup3</MenuItem>
                                <MenuItem value={4}>backup4</MenuItem>
                            </Select>
                            <div className="w-full flex justify-end mt-6">
                                <div className='bg-primary  rounded px-2 justify-center text-center cursor-pointer'><h1 classname='text-white'>Download</h1></div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="w-1/5 h-44">
                    <Card className={classes.card} style={{backgroundColor: theme.palette.card.color, margin: '0px', height: '100%'}}>
                        <Typography variant="subtitle2" align="left">Make Manual Backup</Typography>
                        <Divider style={{marginBottom: '10px'}}/>
                        <div className="flex flex-col mt-4">
                            <h1 className='text-sm mr-4 ml-2 mb-3 text-gray-600 dark:text-gray-300'>Default Path</h1>
                            <TextField
                                size='small'
                                required
                                id='backupManual'
                                defaultValue='C:\pry\storage'
                            />
                            <div className="w-full flex justify-end mt-3">
                                <div className='bg-primary  rounded px-2 justify-center text-center cursor-pointer'><h1 classname='text-white'>Launch</h1></div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="w-1/5 h-44">
                    <Card className={classes.card} style={{backgroundColor: theme.palette.card.color, margin: '0px', height: '100%'}}>
                        <Typography variant="subtitle2" align="left">Restore Backup</Typography>
                        <Divider style={{marginBottom: '10px'}}/>
                        <div className="flex flex-col mt-4">
                            <h1 className='text-sm mr-4 ml-2 mb-3 text-gray-600 dark:text-gray-300'>Select backup</h1>
                            <Select className='h-6 border-none mx-2' sx={{borderStyle: 'none'}} defaultValue={1}>
                                <MenuItem value={1}>backup1</MenuItem>
                                <MenuItem value={2}>backup2</MenuItem>
                                <MenuItem value={3}>backup3</MenuItem>
                                <MenuItem value={4}>backup4</MenuItem>
                            </Select>
                            <div className="w-full flex justify-end mt-6">
                                <div className='bg-primary  rounded px-2 justify-center text-center cursor-pointer'><h1 classname='text-white'>Save</h1></div>
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="w-1/5 h-44">
                    <Card className={classes.card} style={{backgroundColor: theme.palette.card.color, margin: '0px', height: '100%'}}>
                        <Typography variant="subtitle2" align="left">Restore Backup from Path</Typography>
                        <Divider style={{marginBottom: '10px'}}/>
                        <div className="flex flex-col mt-4">
                            <h1 className='text-sm mr-4 ml-2 mb-3 text-gray-600 dark:text-gray-300'>Enter Path</h1>
                            <TextField
                                size='small'
                                required
                                id='backup'
                            />
                            <div className="w-full flex justify-end mt-3">
                                <div className='bg-primary  rounded px-2 justify-center text-center cursor-pointer'><h1 classname='text-white'>Restore</h1></div>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
           

            <Card className={classes.card} style={{backgroundColor: theme.palette.card.color, width: "100% !important"}}>
                <Typography variant="h6" align="left">Configure backups tasks</Typography>
                <Divider style={{marginBottom: '10px'}}/>
                <CardContent>
                    <Grid container rowSpacing={2} style={{marginBottom: '15px'}}>
                        <Grid item xs={12} style={{}}>
                            <TextField
                                className={classes.field} id="filled-basic"
                                label="Backup Path"
                                variant="standard"
                                value={getSettingsValue('BACK.UP_PATH')}
                                onChange={(e) => {
                                    handleSettingsChange('BACK.UP_PATH', e.target.value)
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} style={{marginTop:'25px'}}>
                        <FormControl>
                            <FormLabel component="legend">Retention Backup Modes</FormLabel>
                            <RadioGroup className='ml-4 mt-2' defaultValue={1}>
                                <FormControlLabel classes={{label: classes.label}} value="1" control={<Radio />} label={<>Keep last 
                                    <Select className='h-6 border-none mx-2' defaultValue={5} sx={{borderStyle: 'none'}}>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={8}>8</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={12}>12</MenuItem>
                                    </Select>
                                 Backups</>}></FormControlLabel>
                                 <FormControlLabel classes={{label: classes.label}} value="2" control={<Radio />} label={<>Keep last 
                                    <Select className='h-6 border-none mx-2' sx={{borderStyle: 'none'}} defaultValue={5}>
                                        <MenuItem value={5}>5</MenuItem>
                                        <MenuItem value={10}>10</MenuItem>
                                        <MenuItem value={15}>15</MenuItem>
                                        <MenuItem value={30}>30</MenuItem>
                                    </Select>
                                 Days</>}></FormControlLabel>
                            </RadioGroup>
                        </FormControl>
                        </Grid>
                        <Grid item xs={12} style={{marginTop:'25px'}}>
                            <FormControl>
                                <FormLabel component="legend">Datas to Backup</FormLabel>
                                <RadioGroup className='ml-4 mt-2'>
                                    <FormControlLabel classes={{label: classes.label}} value="1"  control={<Checkbox />} label="Database"></FormControlLabel>
                                    <FormControlLabel classes={{label: classes.label}} value="2"  control={<Checkbox />} label="Config"></FormControlLabel>
                                    <FormControlLabel classes={{label: classes.label}} value="3"  control={<Checkbox />} label="DICOM"></FormControlLabel>
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} style={{marginTop:'25px'}}>
                            <FormControl>
                                <FormLabel component="legend">Scheduling</FormLabel>
                                <RadioGroup className='ml-4 mt-2' row>
                                    <FormControlLabel classes={{label: classes.label}} value="1"  control={<Checkbox />} label="Monday"></FormControlLabel>
                                    <FormControlLabel classes={{label: classes.label}} value="2"  control={<Checkbox />} label="Tuesday"></FormControlLabel>
                                    <FormControlLabel classes={{label: classes.label}} value="3"  control={<Checkbox />} label="Wednesday"></FormControlLabel>
                                    <FormControlLabel classes={{label: classes.label}} value="4"  control={<Checkbox />} label="Thursday"></FormControlLabel>
                                    <FormControlLabel classes={{label: classes.label}} value="5"  control={<Checkbox />} label="Friday"></FormControlLabel>
                                    <FormControlLabel classes={{label: classes.label}} value="6"  control={<Checkbox />} label="Saturday"></FormControlLabel>
                                    <FormControlLabel classes={{label: classes.label}} value="7"  control={<Checkbox />} label="Sunday"></FormControlLabel>
                                </RadioGroup>
                                {/* Set Hour */}
                                <div className="flex ml-4 mt-4 items-center">
                                    <h1 className='text-sm mr-4 text-gray-600 dark:text-gray-300'>Set Backup Time</h1>
                                    <input type="time" name="" defaultValue={'00:00'} id="" className='bg-transparent border border-gray-300 dark:border-gray-200 rounded py-1 px-2 focus:outline-none' />
                                </div>
            
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Index
                        handleSave={handleSave}
                        handleCancel={handleCancel}
                    />
                </CardContent>
            </Card>

           
        </>
    )
}
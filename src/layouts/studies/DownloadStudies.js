import React from "react";
import {Box, Card, CardContent, Dialog, LinearProgress, Slide, Typography} from "@mui/material";
import {useTheme} from "@emotion/react";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function LinearProgressWithLabel(props) {
    return (
        <Box display="flex" alignItems="center" p={3}>
            <Box width="100%" mr={3}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box minWidth={35}>
                <Typography variant="body2" color="textSecondary">{`${Math.round(
                    props.value
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

const DownloadStudies = (props) => {
    const theme = useTheme();

    return (
        <Dialog
            fullWidth
            maxWidth="md"
            open={props.isOpen}
            //onClose={props.toggle}
            TransitionComponent={Transition}
        >
            <Card style={{ backgroundColor: theme.palette.card.color, width: "100% !important", padding: '25px 0px', margin: '0px 0px' }} >
                <CardContent>
                    <Box display="flex" justifyContent="center" alignItems="center" p={3}>
                        <Box>
                            <Typography variant="h5">{props.message}</Typography>
                        </Box>

                    </Box>
                    <LinearProgressWithLabel value={props.progress} />
                </CardContent>
            </Card>

        </Dialog>
    );
}
export default DownloadStudies;
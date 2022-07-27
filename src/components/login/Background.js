import {Box, Card, CardMedia, Typography} from "@mui/material";

export default function Background({ children }) {
    return (
        <Card>
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    image="/images/loginbg.jpg"
                />
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        height: '100%',
                        width: '100%',
                        bgcolor: 'rgba(0, 0, 0, 0.64)',
                        color: 'white',
                        padding: '10px',
                    }}
                >
                    {children}
                </Box>
            </Box>
        </Card>
    );
}
import { createTheme } from "@mui/material";

const darktheme = createTheme({
    palette: {
        primary: {
            main: "#149AD1",
            dark: "#121729",
            light: "#57c3ef",
        },

        secondary: {
            main: '#EB642D',
            dark: '#19354c'
        },

        error: {
            main: "#bf0000"
        },

        action: {
            hover: "rgba(45, 181, 233, 0.16)",
        },

        background: {
            default: "#091021",
            paper: "#0c111f",
            accordion: "#0c111f",
            test: "#19354c"
        },

        color: {
            paper: '#141d30'
        },

        menu: {
            background: "#111",
            text: "#fff",
            border: "#0d1c30"
        },

        table: {
            head: '#121729',
            body: '#121729',
            text: '#fff',
            hover: "#102845",
            hoverSelected: '#102845',
        },

        managereport: {
            bgcolor: '#121729'
        },

        input: {
            borderBottom: '#0d1c30'
        },

        chip: {
            color: "#555",
            background: 'rgb(20,154,209,0.9)'
        },

        mode: "dark",


        text: {
            primary: "#fff"
        },

        card: {
            color: '#0e1627'
        },

        dialog: {
            color: '#1a2132'
        },

        avatar: {
            background: '#888'
        },

        button : {
            background : "#19354c"
        },

        textfield: {
            background : "#1a2132",
            text: '#FFF',
            button: "#1a2132",
            border: "#0a0f1d"
        }

    },

    typography: {
        fontFamily: [
            "Montserrat",
            'Inter',
            'Roboto',
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
    }
});
export default darktheme
import { createTheme } from "@mui/material";

const darktheme = createTheme({
    palette: {
        primary: {
            main: "#149AD1",
            dark: "#1f7da4",
            light: "#57c3ef",
        },

        secondary: {
            main: '#EB642D'
        },

        error: {
            main: "#bf0000"
        },

        action: {
            hover: "rgba(45, 181, 233, 0.16)",
        },

        background: {
            default: "#222",
            paper: "#222",
            accordion: "#2b2b2b"
        },

        menu: {
            background: "#111",
            text: "#fff",
            border: "#020"
        },

        table: {
            head: '#3D3D3D',
            body: '#3D3D3D',
            text: '#fff',
            hover: "#4f4f4f",
            hoverSelected: '#3d3d3d'

        },

        input: {
            borderBottom: '#565656'
        },

        chip: {
            color: "#555",
            background: '#5C5C5C'
        },

        mode: "dark",


        text: {
            primary: "#fff"
        },

        card: {
            color: '#333'
        },

        dialog: {
            color: '#3d3d3d'
        },

        avatar: {
            background: '#888'
        },

        button : {
            background : "#222"
        },

        textfield: {
            background : "#3D3D3D",
            text: '#FFF',
            button: "#3D3D3D",
            border: "#7a7a7a"
        }

    },

    typography: {
        fontFamily: [
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
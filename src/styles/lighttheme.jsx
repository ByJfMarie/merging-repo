import { createTheme } from "@mui/material";

const lighttheme = createTheme({
    palette: {
        primary: {
            main : "#2db4eb",
            dark : "#1f7da4",
            light : "#57c3ef",
        },

        secondary: {
            main: '#EB642D'
        },

        managereport: {
            bgcolor: '#f0f4f8'
        },

        error: {
            main : "#ff1744"
        },

        action:{
            selected: "rgba(45, 181, 233, 0.8)",
            hover: "rgba(45, 181, 233, 0.5)"
        },

        background : {
            default : "#ededed",
            paper: '#EDEDED',
            border : "#DDD",
            accordion : "##d4d4d4"
        },

        menu: {
            background: "#222",
            header: "#222",
            divider: "#545454",
            text: "#FFF",
            border : "#DDD"
        },

        table: {
            head: "#fff", 
            body: '#fff', 
            text: '#000',
            hover: '#f0f0f0',
            hoverSelected: '#dbdbdb', 
            line: '#D2D2D2'
        },

        input: {
            borderBottom: '#E8E8E8'
        },

        chip: {
            color: "#d6d6d6",
            background: "#fff"
        },

        mode : "light",

        text: {
            primary : "#121212"
        },

        card: {
            color : '#fff'
        },

        dialog: {
            color: '#fff'
        },

        avatar: {
            background : '#333' 
        },

        button : {
            background : "#fff"
        },

        textfield: {
            background : "#FFF",
            text: '#333',
            button: "#FFF",
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
export default lighttheme
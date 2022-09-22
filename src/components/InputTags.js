import { Cancel, Tag } from "@mui/icons-material";
import { FormControl, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useRef, useState } from "react";

const Tags = ({ data, handleDelete }) => {
    return (
        <Box
            sx={{
                background: "#283240",
                height: "100%",
                display: "flex",
                padding: "0.4rem",
                margin: "0 0.5rem 0.5rem 0",
                justifyContent: "center",
                alignContent: "center",
                color: "#ffffff",
            }}
        >
            <Stack direction='row' gap={1}>
                <Typography>{data}</Typography>
                <Cancel
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                        handleDelete(data);
                    }}
                />
            </Stack>
        </Box>
    );
};

export default function InputTags({label, placeholder, tags, SetTags}) {
    //const [tags, SetTags] = useState([]);
    const tagRef = useRef();

    const handleDelete = (value) => {
        const newtags = tags.filter((val) => val !== value);
        SetTags(newtags);
    };
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if (!tagRef.current.value) return;

        SetTags([...tags, tagRef.current.value]);
        tagRef.current.value = "";
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <form onSubmit={handleOnSubmit}>
                <TextField
                    label={label}
                    inputRef={tagRef}
                    fullWidth
                    variant='standard'
                    size='small'
                    sx={{ margin: "1rem 0 0 0" }}
                    margin='none'
                    placeholder={tags.length < 1 ? placeholder : ""}
                    onBlur={handleOnSubmit}
                    InputProps={{
                        startAdornment: (
                            <Box sx={{ margin: "0 0.2rem 0 0", display: "flex", flexDirection: "column"}}>
                                {tags.map((data, index) => {
                                    return (
                                        <Tags data={data} handleDelete={handleDelete} key={index} />
                                    );
                                })}
                            </Box>
                        ),
                    }}
                />
            </form>
        </Box>
    );
}
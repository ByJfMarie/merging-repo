import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function Editor(props) {

    const [text, setText] = useState(props.defaultValue === undefined ? "" : props.defaultValue)
    React.useEffect(() => {
        setText(props.defaultValue);
    }, [props.defaultValue]);

    const modules = {
        toolbar: [
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link'],
            ['clean']
        ],
    }

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link'
    ]

    const onChange = props.onChange

    const handleChange = (html) => {
        setText(html)
        onChange(html, props.id)
    }

    return (
            <ReactQuill theme="snow"
                modules={modules}
                formats={formats}
                value={text}
                onChange={handleChange}
            />
    );
}


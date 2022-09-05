import * as React from 'react';
import {useEffect, useState} from "react";
import StudiesService from "../../../../services/api/studies.service";

const Index = (props) => {

    const [thumbnail, setThumbnail] = useState({});

    const loadThumbnail = async (study_uid, size) => {
        const rsp = await StudiesService.getThumbnail(study_uid, size);

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
        else {
            setThumbnail("./images/no_thumb.png");
        }
    }


    useEffect(() => {
        loadThumbnail(props.study_uid, props.size);
    }, [props]);

    return (
        <img src={thumbnail} alt="thumbnail" style={{
            width: props.size+"px",
            padding: "auto",
            display: 'inline-flex',
            margin: "5px 0 5px 0"
        }}/>
    )
}

export default Index;
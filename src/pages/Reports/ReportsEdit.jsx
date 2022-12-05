import React, { Component, useState }  from 'react';
import { EditorState, convertToRaw, convertFromRaw, Modifier } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import '/node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import StudiesService from '../../services/api/studies.service';
import { forwardRef } from 'react';
import { useImperativeHandle } from 'react';

const ReportsEdit = forwardRef((props, ref) => {

    
    const content = StudiesService.getReportContent()
    // console.log(content);
    console.log(convertFromRaw(JSON.parse(content)));
    const [state, setState] = useState({
        editorState: EditorState.createWithContent(
          convertFromRaw(JSON.parse(content)),
        ),
      });
    // props.setContentState(content);

    const editorState = EditorState.createEmpty();

    const onEditorStateChange = (editorState) => {
        setState({
            editorState,
        });
        console.log(editorState.getCurrentContent());
        props.setContentState(editorState.getCurrentContent());
    }

    useImperativeHandle(ref , () => ({
        addText(text) {
            const contentState = state.editorState.getCurrentContent();
            const selection = state.editorState.getSelection();
            const ncs = Modifier.insertText(contentState, selection, text);
            setState({
                editorState: EditorState.push(state.editorState, ncs, 'insert-characters'),
            });
        }
    }));
    




    const OnContentStateChange = (contentState) => {
      props.setContentState(contentState);
    }


    return (
        
        
        <div className="w-full h-full  overflow-auto">
            <Editor
                toolbarClassName="text-black"
                editorClassName="demo-editor border border-gray-150 overflow-auto px-4 py-2 rounded"
                toolbarStyle={{ height: '5%', BackgroundColor: '#0e1627'}}
                editorStyle={{height: '93.3%'}}
                wrapperStyle={{height: '100%'}}
                onEditorStateChange={onEditorStateChange}
                editorState={state.editorState}
            />
        </div>
        
    )
});

export default ReportsEdit;
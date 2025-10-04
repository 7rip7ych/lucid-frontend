import { useRef } from "react";
import Editor from "@monaco-editor/react";

const execjs_url = "https://execjs.emilfolino.se/code";

function CodeEditor(props) {
    const editorRef = useRef(null);

    function handleEditorMount(editor) {
        editorRef.current = editor;
    }

    function saveCode() {
        console.log(editorRef.current.getValue());
    }

    async function executeCode() {
        var data = {
            code: btoa(editorRef.current.getValue())
        };

        const response = await fetch(execjs_url, {
            body: JSON.stringify(data),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });

        const result = await response.json();
        console.log(atob(result.data));
    }

    return (
        <>
        <div className="code-editor">
            <div className="inline-buttons">
                <button className="blue-button" onClick={saveCode}>Save</button>
                <button className="blue-button" onClick={executeCode}>Execute</button>
            </div>
            <div className="code-title">
                <input type="text" className="title" defaultValue={props.doc.title} />
            </div>
            <Editor 
                height="80vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue="// write code here"
                onMount={handleEditorMount}
            />
        </div>
        </>
    );
};

export default CodeEditor;
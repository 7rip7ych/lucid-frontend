import { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";

const execjs_url = "https://execjs.emilfolino.se/code";

function CodeEditor(props) {
    const editorRef = useRef(null);

    function handleEditorMount(editor) {
        editorRef.current = editor;
        if (props.data.type && props.data.type == "code") {
            editorRef.current.setValue(props.data.content);
        } else {
            let txt = props.data.content.replaceAll("// ", "")
            editorRef.current.setValue("// " + txt.replaceAll("\n", "\n// "));
        }
    }
    function saveCode() {
        props.actions.update(editorRef.current.getValue());
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
        openTerminal(atob(result.data));
    }

    function openTerminal(txt) {
        const terminal = document.getElementById("terminalView");
        terminal.classList.remove("hidden");
        terminal.querySelector("p").innerText = txt;
    }

    function closeTerminal(e) {
        e.target.parentNode.classList.add("hidden");
    }

    function handleChange() {
        props.actions.handleChange(editorRef.current.getValue());
    };

    document.getElementById("titleeditor").oninput = (e) => {
        e.target.size = e.target.value.length;
    }

    // set content on change
    useEffect(() => {
        if (editorRef.current && typeof props.data.content !== "undefined" && typeof props.data.title !== "undefined") {
            document.getElementById("titleeditor").value = props.data.title;
            // get and format content
            if (props.data.type && props.data.type == "code") {
                editorRef.current.setValue(props.data.content);
            } else {
                let txt = props.data.content.replaceAll("// ", "")
                editorRef.current.setValue("// " + txt.replaceAll("\n", "\n// "));
            }
        }
    }, [props.data]);

    return (
        <>
        <div id="codeeditor" className="code-editor" onKeyUp={handleChange}>
            <div className="inline-buttons">
                <button className="blue-button" onClick={saveCode}>Save</button>
                <button className="blue-button" onClick={executeCode}>Execute</button>
            </div>
            <div className="code-title">
                <input type="text" id="titleeditor" className="title" defaultValue={props.data.title} size={props.data.title.length} />
            </div>
            <Editor 
                height="80vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue={props.data.content}
                onMount={handleEditorMount}
                id="contenteditor"
            />
            <div id="terminalView" className="terminal-view hidden">
                <span>OUTPUT</span>
                <button id="closeTerminal" className="close-button" onClick={closeTerminal}>&#10005;</button>
                <p></p>
            </div>
        </div>
        </>
    );
};

export default CodeEditor;
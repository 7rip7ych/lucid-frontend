import { useEffect, useState, useRef } from "react";
import Editor from "@monaco-editor/react";

const execjs_url = "https://execjs.emilfolino.se/code";

function CodeEditor(props) {
    const [content, setContent] = useState("");
    const editorRef = useRef(null);
    const docRef = useRef(null);

    function handleEditorMount(editor) {
        editorRef.current = editor;
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

    useEffect(() => {
        // get and format content
        if (props.doc._id) {
            docRef.current = props.doc;
        } else {
            return;
        }
        if (docRef.current.type && docRef.current.type == "code") {
            setContent(docRef.current.content);
        } else {
            setContent("// " + docRef.current.content.replaceAll("\n", "\n// "));
        }
        
    }, [props.doc]);

    function handleChange() {
        console.log("change");
        props.socket.current.emit("content", {
            id: props.doc._id,
            title: document.getElementById("titleeditor").value,
            content: editorRef.current.getValue(),
            type: "code"
        });
    };

    // set content on change
    useEffect(() => {
        if (editorRef.current && typeof props.content !== "undefined" && typeof props.title !== "undefined") {
            document.getElementById("titleeditor").value = props.title;
            editorRef.current.setValue(props.content);
        }
        
    }, [props.title, props.content]);

    return (
        <>
        <div id="codeeditor" className="code-editor">
            <div className="inline-buttons">
                <button className="blue-button" onClick={props.actions.update}>Save</button>
                <button className="blue-button" onClick={executeCode}>Execute</button>
            </div>
            <div className="code-title">
                <input type="text" id="titleeditor" className="title" defaultValue={props.doc.title} onKeyUp={handleChange} />
            </div>
            <Editor 
                height="80vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue={content}
                onMount={handleEditorMount}
                id="contenteditor"
                onChange={handleChange}
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
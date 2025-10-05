import { useRef } from "react";
import Editor from "@monaco-editor/react";
import { useState } from "react";
import { useEffect } from "react";
import documents from "../models/docs";

const execjs_url = "https://execjs.emilfolino.se/code";

function CodeEditor(props) {
    const [content, setContent] = useState("");
    const editorRef = useRef(null);
    const docRef = useRef(null);

    function handleEditorMount(editor) {
        editorRef.current = editor;
    }

    async function saveCode() {
        var data = {
            "id": props.doc._id,
            "title": document.getElementById("codeTitle").value,
            "content": editorRef.current.getValue(),
            "type": "code"
        }
        
        await documents.updateOneDoc(data);
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

    return (
        <>
        <div className="code-editor">
            <div className="inline-buttons">
                <button className="blue-button" onClick={saveCode}>Save</button>
                <button className="blue-button" onClick={executeCode}>Execute</button>
            </div>
            <div className="code-title">
                <input type="text" id="codeTitle" className="title" defaultValue={props.doc.title} />
            </div>
            <Editor 
                height="80vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue={content}
                onMount={handleEditorMount}
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
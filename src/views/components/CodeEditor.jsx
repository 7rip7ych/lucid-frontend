import { useEffect, useRef, useState, useCallback } from "react";
import { Editor, useMonaco } from "@monaco-editor/react";

import auth from "../models/auth";

const execjs_url = "https://execjs.emilfolino.se/code";

function CodeEditor(props) {
    const editorRef = useRef(null);
    const monaco = useMonaco();
    const [decorations, setDecorations] = useState([]);

    function handleEditorMount(editor) {
        editorRef.current = editor;
        setDecorations(editorRef.current.createDecorationsCollection([]));

        // Title length
        document.getElementById("titleeditor").oninput = (e) => {
            e.target.size = e.target.value.length;
        };

        // Comment text content
        if (props.data.type && props.data.type == "code") {
            editorRef.current.setValue(props.data.content);
        } else {
            let txt = props.data.content.replaceAll("// ", "")
            editorRef.current.setValue("// " + txt.replaceAll("\n", "\n// "));
        }
    }
    const selectRow = useCallback(() => {
        // Select row
        var sel = editorRef.current.getSelection();
        if (sel) {
            var line = sel.startLineNumber;
            props.actions.select(line);
            if (document.querySelector(".comment-form").offsetParent !== null && monaco) {
                // Show selection if comment form is open
                editorRef.current.setSelection(new monaco.Range(line,1,line+1,1));
            }
        }
    }, [monaco, props.actions]);

    // Selection
    useEffect(() => {
        document.getElementById("codeeditor").addEventListener("click", selectRow);
    }, [monaco, selectRow])

    // Set decorations for comments
    useEffect(() => {
        if (editorRef.current && monaco && decorations) {
            let decArr = [];
            if (props.comments) {
                props.comments.forEach(comment => {
                    if (!comment.selection) { return; } // No selection = no decoration
                    let decClass = "commentGlyph"
                    if (comment.owner.email === auth.email) {
                        decClass = "myCommentGlyph"
                    }
                    
                    decArr.push({
                        range: new monaco.Range(comment.selection,1,comment.selection,1),
                        options: {
                            isWholeLine: true,
                            linesDecorationsClassName: decClass,
                            hoverMessage: [{ value: comment.owner.email }, { value: comment.content }]
                        },
                    });
                });
            }

            decorations.set(decArr);
        }
    }, [monaco, decorations, props.comments])

    useEffect(() => {
        if (editorRef.current && monaco && props.commentMode) {
            var sel = editorRef.current.getSelection();
            if (sel && sel.startLineNumber) {
                var line = sel.startLineNumber;
                editorRef.current.setSelection(new monaco.Range(line,1,line+1,1));
            }
        }
    }, [props.commentMode, monaco]);


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
                <input type="text" id="titleeditor" className="title" defaultValue={props.data.title} size={props?.data?.title?.length} />
            </div>
            <Editor 
                height="80vh"
                theme="vs-dark"
                defaultLanguage="javascript"
                defaultValue={props.data.content}
                onMount={handleEditorMount}
                id="contenteditor"
                glyphMargin="true"
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
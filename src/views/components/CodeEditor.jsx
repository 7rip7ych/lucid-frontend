import Editor from "@monaco-editor/react";

function CodeEditor() {

    return (
        <>
        <div className="code-editor">
            <h2>Code Editor</h2>
            <Editor height="80vh" defaultLanguage="javascript" defaultValue="// write code here" />
        </div>
        </>
    );
};

export default CodeEditor;
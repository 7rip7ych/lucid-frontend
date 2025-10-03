import { useState, useEffect, useRef } from "react";
import documents from "../models/docs";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:1337";


function Editor(props) {
    const navigate = useNavigate();
    const [editorTitle, setEditorTitle] = useState("");
    const [editorContent, setEditorContent] = useState("");

    // set initial variables
    useEffect(() => {
        setEditorTitle(props.doc.title)
        setEditorContent(props.doc.content);
    }, [props.doc]);

    
    // Create new doc
    async function createDoc() {
        let newDoc = {
            "title": document.getElementById("titleeditor").value,
            "content": document.getElementById("contenteditor").value
        };
        const result = await documents.addOneDoc(newDoc);

        navigate(`/lucid-frontend/${result.insertedId}`); // Redirect to new id
    }

    // Update document
    async function updateDoc() {
        let updatedDoc = {
            "id": props.doc._id,
            "title": document.getElementById("titleeditor").value,
            "content": document.getElementById("contenteditor").value
        };

        await documents.updateOneDoc(updatedDoc);
        
        // Show success
        const updateBtn = document.getElementById("update");
        updateBtn.classList.add("success-animation");
        setTimeout(() => updateBtn.classList.remove("success-animation"), 1000);
    }

    // Delete the document
    async function deleteDoc() {
        if (props.doc._id) {
            await documents.deleteOneDoc(props.doc._id);
        }
        
        navigate("/lucid-frontend/");  // Redirect to home
    }

    // Handle a submission of the form
    async function handleSubmit(e) {
        e.preventDefault();

        switch (e.nativeEvent.submitter.value) {
            case "Skapa":
                await createDoc();
                break;
            case "Uppdatera":
                await updateDoc();
                break;
            case "Radera":
                await deleteDoc();
                break;
            default:
        }
    }


    // set content on change
    useEffect(() => {
        if (typeof editorContent !== "undefined" && typeof editorTitle !== "undefined") {
            document.getElementById("titleeditor").value = editorTitle;
            document.getElementById("contenteditor").value = editorContent;
        }
        
    }, [editorTitle, editorContent]);

    // socket
    const socket = useRef(null);

    useEffect(() => {
        if (!props.doc._id) {
            return;
        }

        socket.current = io(SERVER_URL);

        socket.current.emit("create", props.doc._id);

        socket.current.on("content", (data) => {
            setEditorTitle(data.title);
            setEditorContent(data.content);
        });

        document.getElementById("texteditor").addEventListener("keyup", function() {
            socket.current.emit("content", {
                id: props.doc._id,
                title: document.getElementById("titleeditor").value,
                content: document.getElementById("contenteditor").value
            });
        });

        return () => {
            socket.current.disconnect();
        }
    }, [props.doc._id]);

    return (
        <>
        <div className="editor">
            <form onSubmit={handleSubmit} id="texteditor" className="editor-form new-doc">
                <label htmlFor="id">Id</label>
                <input type="text" name="id" defaultValue={props.doc._id} readOnly/>

                <label htmlFor="title">Titel</label>
                <input type="text" id="titleeditor" name="title" defaultValue={props.doc.title} />

                <label htmlFor="content">Innehåll</label>
                <textarea id="contenteditor" name="content" defaultValue={props.doc.content} ></textarea>

                <input type="submit" id="create" value="Skapa" />
                <input type="submit" id="update" value="Uppdatera" />
                <input type="submit" id="delete" value="Radera" />
            </form>
        </div>
        </>
    );
};

export default Editor;
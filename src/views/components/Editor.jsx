import { useState, useEffect, useRef } from "react";
import documents from "../models/docs";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const SERVER_URL = "http://localhost:1337";


function Editor(props) {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [editorContent, setEditorContent] = useState("");

    // set initial variables
    useEffect(() => {
        setTitle(props.doc.title);
        setEditorContent(props.doc.content);
    }, [props.doc]);

    // handle edits
    function handleChange(e) {
        e.target.name == "title" ? setTitle(e.target.value) : setContent(e.target.value);
    }

    // Create new doc
    async function createDoc() {
        let newDoc = {
            "title": title === "" ? props.doc.title : title,
            "content": content === "" ? props.doc.content : content
        };
        const result = await documents.addOneDoc(newDoc);

        navigate(`/lucid-frontend/${result.insertedId}`); // Redirect to new id
    }

    // Update document
    async function updateDoc() {
        let updatedDoc = {
            "id": props.doc._id,
            "title": title === "" ? props.doc.title : title,
            "content": content === "" ? props.doc.content : content
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
        document.getElementById("texteditor").value = editorContent;
    }, [editorContent])


    // socket
    const socket = useRef(null);

    useEffect(() => {
        socket.current = io(SERVER_URL);

        socket.current.emit("create", props.doc._id);

        socket.current.on("content", (data) => {
            setEditorContent(data.content);
            // console.log(data.content);
        });

        document.getElementById("texteditor").addEventListener("keyup", function(event) {
            socket.current.emit("content", {
                id: props.doc._id,
                title: props.doc.title,
                content: event.target.value
            });
        });

        return () => {
            socket.current.disconnect();
        }
    }, [props.doc]);

    return (
        <>

        <form onSubmit={handleSubmit} className="new-doc">
            <label htmlFor="id">Id</label>
            <input type="text" name="id" defaultValue={props.doc._id} readOnly/>

            <label htmlFor="title">Titel</label>
            <input type="text" name="title" defaultValue={title} onChange={handleChange} />

            <label htmlFor="content">Innehåll</label>
            <textarea id="texteditor" name="content" defaultValue={content} onChange={handleChange}></textarea>

            <input type="submit" id="create" value="Skapa" />
            <input type="submit" id="update" value="Uppdatera" />
            <input type="submit" id="delete" value="Radera" />
        </form>
        
        </>
    );
};

export default Editor;
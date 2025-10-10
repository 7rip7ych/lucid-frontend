import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

import Header from './components/Header';
import Footer from './components/Footer';
import imgUrl from '../assets/skateboard.gif';
import documents from './models/docs';
import TextEditor from './components/TextEditor';
import CodeEditor from './components/CodeEditor';

const SERVER_URL = "https://jsramverk-editor-idal24-gcg4bgaydzg5cgc4.northeurope-01.azurewebsites.net/";

function Doc() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [docu, setDoc] = useState([]);
    const [load, setLoading] = useState(<img src={imgUrl} alt="loading" className="loading-gif" />);
    const [editor, setEditor] = useState(<TextEditor />);
    const [type, setType] = useState("text");
    const [editorTitle, setEditorTitle] = useState("");
    const [editorContent, setEditorContent] = useState("");

    // set initial variables
    useEffect(() => {
        if (docu) {
            setEditorTitle(docu.title);
            setEditorContent(docu.content);
        }
    }, [docu]);

    useEffect(() => {
        const loadData = async () => {
            const DocData = await documents.getOneDoc(id);
            setDoc(DocData);
            setLoading();
        };

        loadData();
    }, [id, editor]);

    function changeEditor(e) {
        if (e.target.checked) {
            setEditor(<CodeEditor />);
            setType("code");
        } else {
            setEditor(<TextEditor />);
            setType("text");
        }
    }

    const actions = {
        create: async function createDoc() {
            let newDoc = {
                "title": document.getElementById("titleeditor").value,
                "content": document.getElementById("contenteditor").value,
                "type": type
            };
            const result = await documents.addOneDoc(newDoc);

            navigate(`/lucid-frontend/${result.insertedId}`); // Redirect to new id
        },
        update: async function updateDoc() {
            let updatedDoc = {
                "id": docu._id,
                "title": document.getElementById("titleeditor").value,
                "content": document.getElementById("contenteditor").value,
                "type": type
            };

            await documents.updateOneDoc(updatedDoc);
            
            // Show success
            if (type == "text") {
                const updateBtn = document.getElementById("update");
                updateBtn.classList.add("success-animation");
                setTimeout(() => updateBtn.classList.remove("success-animation"), 1000);
            }
        },
        delete: async function deleteDoc() {
            if (docu._id) {
                await documents.deleteOneDoc(docu._id);
            }
            
            navigate("/lucid-frontend/");  // Redirect to home
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
        if (!docu._id) {
            return;
        }

        socket.current = io(SERVER_URL);

        socket.current.emit("create", docu._id);

        socket.current.on("content", (data) => {
            setEditorTitle(data.title);
            
            setEditorContent(data.content);
            
        });

        return () => {
            socket.current.disconnect();
        }
    }, [docu._id]);

    useEffect(() => {
        
    })
    

    return (
        <>
        <Header />
        <main className="main">
            <h2>Dokument</h2>
            <div className="toggle-container">
                <span>Text Editor</span>
                <label className="switch">
                    <input type="checkbox" id="changeEditor" className="toggle-checkbox change-editor" onClick={changeEditor} />
                    <span className="slider round"></span>
                </label>
                <span>Code Editor</span>
            </div>
            {load}
            {React.cloneElement(editor, { doc: docu, actions: actions, socket: socket })}
        </main>
        <Footer />
        </>
    );
}

export default Doc

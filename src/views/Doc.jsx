import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
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
    const [load, setLoading] = useState(<img src={imgUrl} alt="loading" className="loading-gif" />);
    const [editor, setEditor] = useState(<TextEditor />);
    const [type, setType] = useState("text");
    const [data, setData] = useState("");
    const [temp, setTemp] = useState("");

    useEffect(() => {
        const loadData = async () => {
            const docData = await documents.getOneDoc(id);
            // Rename _id
            docData["id"] = docData["_id"];
            delete docData["_id"];
            setData(docData);
            setTemp(docData);
            setLoading();
        };

        loadData();
    }, [id]);

    function changeEditor(e) {
        // Make local changes transfer between editors
        if (temp !== data) {
            setData(temp);
        }
        if (e.target.checked) {
            setEditor(<CodeEditor />);
            setType("code");
        } else {
            setEditor(<TextEditor />);
            setType("text");
        }
    }

    function newComment() {
        // highlight text
        // open textbox
        document.querySelector(".comment-form").style.display = "block";
    }

    function addComment() {
        const comment = document.getElementById('commentText')
        // get selected text
        // call function
        // update
        closeComment();
    }

    function closeComment() {
        document.querySelector(".comment-form").style.display = "none";
    }

    const actions = {
        create: async function createDoc(content=document.getElementById("contenteditor").value) {
            let newDoc = {
                "title": document.getElementById("titleeditor").value,
                "content": content,
                "type": type
            };
            const result = await documents.addOneDoc(newDoc);

            navigate(`/lucid-frontend/${result.insertedId}`); // Redirect to new id
        },
        update: async function updateDoc(content=document.getElementById("contenteditor").value) {
            let updatedDoc = {
                "id": data.id,
                "title": document.getElementById("titleeditor").value,
                "content": content,
                "type": type
            };

            await documents.updateOneDoc(updatedDoc);
            setData(updatedDoc);
            setTemp(updatedDoc);
            // Show success
            if (type == "text") {
                const updateBtn = document.getElementById("update");
                updateBtn.classList.add("success-animation");
                setTimeout(() => updateBtn.classList.remove("success-animation"), 1000);
            }
        },
        delete: async function deleteDoc() {
            if (data.id) {
                await documents.deleteOneDoc(data.id);
            }
            
            navigate("/lucid-frontend/");  // Redirect to home
        },
        handleChange: function handleChange(content) {
            if (socket.current) {
                var obj = {
                    id: data.id,
                    title: document.getElementById("titleeditor").value,
                    content: content,
                    type: type
                };
                socket.current.emit("content", obj);
                setTemp(obj);
            }
        }
    }


    // socket
    const socket = useRef(null);

    useEffect(() => {
        if (!id) {
            return;
        }

        socket.current = io(SERVER_URL);

        socket.current.emit("create", id);

        socket.current.on("content", (newData) => {
            setData(newData);
            setTemp(newData);
        });

        return () => {
            socket.current.disconnect();
        }
    }, [id]);

    return (
        <>
        <Header />
        <div className="wrap">
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
                {React.cloneElement(editor, { data: data, actions: actions })}
            </main>
            <aside className="aside">
                <button className="comment-button" id="newComment" onClick={newComment}>Comment</button>
                <form className='comment-form' style={{display: 'none'}}>
                    <button className='close-button' onClick={closeComment}>&#10005;</button>
                    <textarea className='comment-text' id='commentText' rows="3" autoFocus></textarea>
                    <input type='submit' value='Comment' onClick={addComment} />
                </form>
                <div className="comment-section" id="commentSection"></div>
            </aside>
        </div>
        
        <Footer />
        </>
    );
}

export default Doc

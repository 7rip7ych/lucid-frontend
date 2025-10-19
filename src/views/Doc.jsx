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
import auth from './models/auth';

const SERVER_URL = "https://jsramverk-editor-idal24-gcg4bgaydzg5cgc4.northeurope-01.azurewebsites.net/";
// const SERVER_URL = "http://localhost:1337/";

function Doc() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [load, setLoading] = useState(<img src={imgUrl} alt="loading" className="loading-gif" />);
    const [editor, setEditor] = useState(<TextEditor />);
    const [type, setType] = useState("text");
    const [data, setData] = useState("");
    const [temp, setTemp] = useState("");
    const [selection, setSelection] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const docData = await documents.getOneDoc(id);
            // Rename _id
            docData["id"] = docData["_id"];
            delete docData["_id"];
            setData(docData);
            setTemp(docData);

            // set comments
            let tempComments = [{
                id: 1,
                owner: "7rip7ych",
                content: "comment example text",
                selection: [1, "add"]
            },
            {
                id: 2,
                owner: "7rip7ych",
                content: "comment some text",
                selection: [3, "add"]
            }];
            // const tempComments = await documents.documentComments(id);
            setComments(tempComments);

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

    useEffect(() => {
        // display comments on page
        let section = document.getElementById("commentSection");
        if (!section) { return; } // return if unrendered

        section.innerHTML = "";
        if (!comments) { return; } // return if no comments

        comments.forEach((comment) => {
            let ele = document.createElement("div");
            ele.className = "comment";
            ele.dataset.id = comment.id;
            ele.dataset.selection = JSON.stringify(comment.selection);
            ele.innerHTML = `
                <span class="byline">${comment.owner}</span>
                <p>${comment.content}</p>
                <button class="delete-button">Delete</button>
            `;
            section.appendChild(ele);

            ele.onmouseenter = () => {
                var sel = document.querySelector(`[data-id="${ele.dataset.id}"]`);
                sel.classList.add("focus");
            }
            ele.onmouseleave = () => {
                var sel = document.querySelector(`[data-id="${ele.dataset.id}"]`);
                sel.classList.remove("focus");
            }
        });

        section.querySelectorAll(".delete-button").forEach(button => button.addEventListener("click", deleteComment))
    }, [comments]);


    function openCommentForm() {
        // highlight text
        document.querySelector(".comment-form").style.display = "block";
    }

    function closeCommentForm(e) {
        e.preventDefault();
        document.querySelector(".comment-form").style.display = "none";
    }

    function addComment(e) {
        e.preventDefault();
        let comment = {
            owner: auth.userId,
            document: data.id,
            content: document.getElementById('commentText').value,
            selection: selection
        }

        console.log(comment);
        // socket.current.emit("new-comment", comment);

        closeCommentForm(e);
    }

    function deleteComment(e) {
        e.preventDefault();
        socket.current.emit("del-comment", e.target.parentNode.id);
        e.target.parentNode.remove();
    }

    // show selection
    useEffect(() => {
        document.getElementById("selectionDisplay").innerHTML = selection;
    }, [selection]);

    const actions = {
        create: async function createDoc(content=document.getElementById("contenteditor").value) {
            let newDoc = {
                "owners": auth.userId,
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
                "owners": auth.userId,
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
                    owners: auth.userId,
                    title: document.getElementById("titleeditor").value,
                    content: content,
                    type: type
                };
                socket.current.emit("content", obj);
                setTemp(obj);
            }
        },
        select: setSelection
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

        // set comments
        socket.current.on("comment", (comments) => {
            setComments(comments);
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
                {React.cloneElement(editor, { data: data, actions: actions, comments: comments })}
            </main>
            <aside className="aside">
                <button className="blue-button comment-button" id="openCommentForm" onClick={openCommentForm}>Comment</button>
                <p id="selectionDisplay"></p>
                <form className='comment-form' style={{display: 'none'}} onSubmit={() => {return false}}>
                    <button className='close-button' onClick={closeCommentForm}>&#10005;</button>
                    <textarea className='comment-text' id='commentText' rows="2" autoFocus></textarea>
                    <button className="enter" onClick={addComment}>Comment</button>
                </form>
                <div className="comment-section" id="commentSection">
                </div>
            </aside>
        </div>
        
        <Footer />
        </>
    );
}

export default Doc

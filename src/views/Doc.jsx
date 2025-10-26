import React, { useCallback } from 'react';
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
import commentFunctions from './models/comments';

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
    const [commentMode, setCommentMode] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const docData = await documents.getOneDoc(id);
            // Rename _id
            docData["id"] = docData["_id"];
            delete docData["_id"];
            setData(docData);
            setTemp(docData);

            // set comments
            /*let tempComments = [{
                _id: 1,
                owner: {email: "dev.7rip7ych@gmail.com"},
                content: "comment example text",
                selection: 1
            },
            {
                _id: 2,
                owner: {email: "7rip7ych"},
                content: "comment some text",
                selection: 3
            }];*/
            const tempComments = await documents.documentComments(id);
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

    const deleteComment = useCallback(async(e) => {
        e.preventDefault();
        var commentId = e.target.parentNode.dataset.id;
        await commentFunctions.deleteOneComment(commentId);
        socket.current.emit("comment", id);
        e.target.parentNode.remove();
    }, [id]);

    useEffect(() => {
        // display comments on page
        let section = document.getElementById("commentSection");
        if (!section) { return; } // return if unrendered

        section.innerHTML = "";
        if (!comments) { return; } // return if no comments

        comments.forEach((comment) => {
            let ele = document.createElement("div");
            ele.className = "comment";
            ele.dataset.id = comment._id;
            ele.dataset.selection = comment.selection;
            ele.innerHTML = `
                <span class="byline">${comment.owner.email}</span>
                <p>${comment.content}</p>
                <button class="delete-button">Delete</button>
            `;
            section.appendChild(ele);

            ele.onmouseenter = () => {
                var sel = document.querySelectorAll(`[data-id="${ele.dataset.id}"]`);
                sel.forEach(ele => ele.classList.add("focus"));
            }
            ele.onmouseleave = () => {
                var sel = document.querySelectorAll(`[data-id="${ele.dataset.id}"]`);
                sel.forEach(ele => ele.classList.remove("focus"));
            }
        });

        section.querySelectorAll(".delete-button").forEach(button => button.addEventListener("click", deleteComment))
    }, [comments, deleteComment]);


    function openCommentForm() {
        // highlight text
        document.querySelector(".comment-form").style.display = "block";
        setCommentMode(true);
    }

    function closeCommentForm(e) {
        e.preventDefault();
        document.querySelector(".comment-form").style.display = "none";
        setCommentMode(false);
    }

    async function addComment(e) {
        e.preventDefault();
        // Define comment object
        let comment = {
            owner: auth.userId,
            document: data.id,
            content: document.getElementById('commentText').value,
            selection: selection
        }

        commentFunctions.addOneComment(comment); // Add to database
        var newComments = await documents.documentComments(id); // Get all comments
        setComments(await newComments);
        socket.current.emit("comment", id); // Emit change

        closeCommentForm(e);
    }

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

        socket.current = io(SERVER_URL, { transports: ['websocket'] });

        socket.current.emit("create", id);

        socket.current.on("content", (newData) => {
            setData(newData);
            setTemp(newData);
        });

        // set comments
        socket.current.on("new-comment", async() => {
            console.log("sock")
            var newComments = await documents.documentComments(id);
            setComments(await newComments);
        });

        socket.current.on("del-comment", async() => {
            console.log("sock")
            var newComments = await documents.documentComments(id);
            setComments(await newComments);
        })

        socket.current.on("comment", async() => {
            console.log("sock")
            var newComments = await documents.documentComments(id);
            setComments(await newComments);
        })

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
                {React.cloneElement(editor, { data: data, actions: actions, comments: comments, commentMode: commentMode })}
            </main>
            <aside className="aside">
                <button className="blue-button comment-button" id="openCommentForm" onClick={openCommentForm}>Comment</button>
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

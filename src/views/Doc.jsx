import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import { io } from 'socket.io-client';
import Header from './components/Header';
import Footer from './components/Footer';
import imgUrl from '../assets/skateboard.gif';
import documents from './models/docs';
import Form from './components/Form';

const SERVER_URL = "http://localhost:1337";
let socket;
let editor;

function Doc() {
    const { id } = useParams();
    const [docu, setDoc] = useState([]);
    const [load, setLoading] = useState(<img src={imgUrl} alt="loading" className="loading-gif" />);

    useEffect(() => {
        const loadData = async () => {
            const DocData = await documents.getOneDoc(id);
            setDoc(DocData);
            setLoading();
        };

        loadData();
    }, [id]);
    
    const [editorContent, setEditorContent] = useState(docu["content"]);
    useEffect(() => {
        editor = document.getElementById("texteditor");
        editor.innerText = editorContent;
    }, [editorContent])


    useEffect(() => {
        socket = io(SERVER_URL);

        socket.emit("create", id);
        socket.on("content", (data) => {
            setEditorContent(data.content, false);
        })
        editor = document.getElementById("texteditor");

        editor.addEventListener("keyup", function(event) {
            socket.emit("content", {
                _id: id,
                content: event.target.value
            });
        })
        return () => {
            socket.disconnect();
        }
    }, [id]);


    
    return (
        <>
        <Header />
        <main className="main">
            <h2>Dokument</h2>
            {load}
            <Form doc={docu} />
        </main>
        <Footer />
        </>
    );
}

export default Doc

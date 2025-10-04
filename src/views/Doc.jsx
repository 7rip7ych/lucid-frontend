import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import imgUrl from '../assets/skateboard.gif';
import documents from './models/docs';
import TextEditor from './components/TextEditor';
import CodeEditor from './components/CodeEditor';

function Doc() {
    const { id } = useParams();
    const [docu, setDoc] = useState([]);
    const [load, setLoading] = useState(<img src={imgUrl} alt="loading" className="loading-gif" />);
    const [editor, setEditor] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const DocData = await documents.getOneDoc(id);
            setDoc(DocData);
            setEditor(<TextEditor doc={DocData} />);
            setLoading();
        };

        loadData();
    }, [id]);

    function changeEditor(e) {
        if (e.target.checked) {
            console.log("code");
            setEditor(<CodeEditor />);
        } else {
            console.log("text");
            setEditor(<TextEditor doc={docu} />);
        }
    }

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
            {editor}
        </main>
        <Footer />
        </>
    );
}

export default Doc

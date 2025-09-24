import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import Header from './components/Header';
import Footer from './components/Footer';
import documents from './models/docs';
import Form from './components/Form';

function Doc() {
    const { id } = useParams();
    const [docu, setDoc] = useState([]);
    const [load, setLoading] = useState(<img src="/skateboard.gif" alt="loading" className="loading-gif" />);

    useEffect(() => {
        const loadData = async () => {
            const DocData = await documents.getOneDoc(id);
            setDoc(DocData);
            setLoading();
        };

        loadData();
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

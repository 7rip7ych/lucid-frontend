import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import Header from './includes/header';
import Footer from './includes/footer';
import documents from './models/docs';
import Form from './includes/Form';

function Doc() {
    const { id } = useParams();
    const [docu, setDoc] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const DocData = await documents.getOneDoc(id);
            setDoc(DocData);
        };

        loadData();
    }, [id]);
    
    return (
        <>
        <Header />
        <main className="main" id="main">
            <Form doc={docu} />
        </main>
        <Footer />
        </>
    );
}

export default Doc

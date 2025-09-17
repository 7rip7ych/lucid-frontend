import { useParams } from 'react-router-dom';
import { useState, useEffect} from "react";
import Header from './includes/header';
import Footer from './includes/footer';
import AddForm from './includes/AddForm';
import UpdateForm from './includes/UpdateForm';
import documents from './models/docs';

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
            <AddForm doc={docu} />
            <UpdateForm doc={docu} />
        </main>
        <Footer />
        </>
    );
}

export default Doc

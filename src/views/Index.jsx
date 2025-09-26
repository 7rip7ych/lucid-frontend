import { useState, useEffect} from "react";
import { Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import documents from './models/docs';
import imgUrl from '../assets/skateboard.gif';

function Index() {
    const { location } = useLocation();
    const [docs, setDocs] = useState([]);
    const [load, setLoading] = useState(<img src={imgUrl} alt="loading" className="loading-gif" />);
    
    useEffect(() => {
        const loadData = async () => {
            const allDocsData = await documents.allDocuments();
            setDocs(allDocsData);
            setLoading();
        };

        loadData();
    }, [location]);

    return (
        <>

        <Header />
        <main className="main">

        <h2>Dokument</h2>
            {load}
            {docs.map((doc) => (
                <h3 key={doc._id}><Link to={doc._id}>{doc.title}</Link></h3>
            ))}
        </main>
        <Footer />

        </>
    );
}

export default Index

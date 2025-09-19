import { useState, useEffect} from "react";
import Header from './includes/header'
import Footer from './includes/footer'
import documents from './models/docs'

function Index() {
    const [docs, setDocs] = useState([]);
    const [load, setLoading] = useState(<img src="src/assets/skateboard.gif" alt="loading" className="loading-gif" />);
    
    useEffect(() => {
        const loadData = async () => {
            const allDocsData = await documents.allDocuments();
            setDocs(allDocsData);
            setLoading();
        };

        loadData();
    }, []);
    return (
        <>
        {/* <%- include('includes/header'); %> */}
        <Header />
        <main className="main" id="main">

        <h2>Dokument</h2>
            {load}
            {docs.map((doc) => (
                <h3 key={doc._id}><a href={`/${doc._id}`}>{doc.title}</a></h3>
            ))}
        {/* <%- include('includes/footer'); %> */}
        </main>
        <Footer />
        </>
    );
}

export default Index

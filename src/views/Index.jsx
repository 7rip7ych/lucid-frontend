import React from 'react';
import { useState, useEffect} from "react";
import Header from './components/Header'
import Footer from './components/Footer'
import documents from './models/docs'

function Index() {
    const [docs, setDocs] = useState([]);
    const [load, setLoading] = useState(<img src="/skateboard.gif" alt="loading" className="loading-gif" />);

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

        <Header />
        <main className="main">

        <h2>Dokument</h2>
            {load}
            {docs.map((doc) => (
                <h3 key={doc._id}><a href={`/${doc._id}`}>{doc.title}</a></h3>
            ))}
        </main>
        <Footer />

        </>
    );
}

export default Index

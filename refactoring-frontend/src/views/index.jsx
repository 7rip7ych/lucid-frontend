import React from 'react';
import { useState, useEffect} from "react";
import Header from './includes/header'
import Footer from './includes/footer'
import documents from './models/docs'

function Index() {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            const allDocsData = await documents.allDocuments();
            setDocs(allDocsData);
        };

        loadData();
    }, []);
    
    return (
        <>
        {/* <%- include('includes/header'); %> */}
        <Header />
        <main className="main" id="main">

        <h2>Dokument</h2>
            {docs.map((doc) => (
                <a href={`/${doc._id}`}>{doc.title}</a>
            ))}
        {/* <%- include('includes/footer'); %> */}
        </main>
        <Footer />
        </>
    );
}

export default Index

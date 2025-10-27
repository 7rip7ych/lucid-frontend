import { useState, useEffect} from "react";
import { useLocation, useNavigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import users from './models/users';
import imgUrl from '../assets/skateboard.gif';
import auth from './models/auth.jsx';
import AddSharedDoc from './components/AddSharedDoc';
import DocInfo from './components/DocInfo.jsx';
import documents from './models/docs';

function Index() {
    const { location } = useLocation();
    const navigate = useNavigate();
    const [docs, setDocs] = useState([]);
    const [load, setLoading] = useState(<img src={imgUrl} alt="loading" className="loading-gif" />);
    
    useEffect(() => {
        // Loads user data.
        const loadData = async () => {
            const usersDocsData = await users.usersDocuments(auth.userId);
            setDocs(usersDocsData);
            setLoading();
        };

        loadData();
    }, [location]);

    async function handleNewDoc(event) {
        event.preventDefault();

        const data = {
            title: "",
            content: "",
            type: "text",
            owners: auth.userId
        }

        const result = await documents.addOneDoc(data);

        navigate(`/lucid-frontend/${result.insertedId}`);
    }

    return (
        <>

        <Header />
        <main className="main">
        <h2 className="index-title">{ auth.email } dokument's</h2>
            {load}

            <button className="document-button new-document-button" onClick={handleNewDoc}>
                Nytt
            </button>
            <AddSharedDoc />
            <div className="documents">
                {
                    docs.map((doc) => (
                        <DocInfo key={doc._id} docId={doc._id} username={auth.email} docTitle={doc.title} docContent={doc.content}/>
                    ))
                }
            </div>
        </main>
        <Footer />

        </>
    );
}

export default Index

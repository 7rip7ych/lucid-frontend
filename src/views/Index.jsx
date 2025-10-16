import { useState, useEffect} from "react";
import { Link, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import users from './models/users';
import imgUrl from '../assets/skateboard.gif';
import auth from './models/auth.jsx';

function Index() {
    const { location } = useLocation();
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

    return (
        <>

        <Header />
        <main className="main">

        <h2>{ auth.email } dokument's</h2>
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
